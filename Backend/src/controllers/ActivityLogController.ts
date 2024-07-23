import { Request, Response } from "express";
import { Repository, FindOptionsWhere } from "typeorm";
import { ActivityLog } from "../entities/ActivityLog";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Washroom } from "../entities/Washroom";
import { ActivityAction, WashroomStatus } from "../enum/common";

const activityLogRepo: Repository<ActivityLog> =
  AppDataSource.getRepository(ActivityLog);

interface QueryConditions extends FindOptionsWhere<ActivityLog> {
  userId?: number;
  washroomId?: number;
}

export class ActivityLogController {
  static logActivity = async (
    status: WashroomStatus,
    washroom: Washroom,
    janitor?: User
  ) => {
    try {
      let activityName;
      switch (status) {
        case WashroomStatus.Available:
          if (janitor) {
            activityName = ActivityAction.CleaningCompleted;
          } else {
            activityName = ActivityAction.Exit;
          }
          break;

        case WashroomStatus.Occupied:
          activityName = ActivityAction.Entry;
          break;

        case WashroomStatus.Cleaning:
          activityName = ActivityAction.CleaningStarted;
          break;

        case WashroomStatus.Announcement:
          activityName = ActivityAction.Announcement;
          break;

        default:
          break;
      }

      const newActivity = new ActivityLog();
      newActivity.action = activityName as ActivityAction;
      newActivity.timestamp = new Date();
      newActivity.washroom = washroom;
      if (janitor) {
        newActivity.user = janitor;
      }

      await activityLogRepo.save(newActivity);
      
    } catch (e) {
      return false;
    }
  };

  static getActivityLog = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { janitorId, washroomId } = req.query; // Optional query parameter

      let queryConditions: QueryConditions = {};
      if (janitorId) {
        queryConditions["userId"] = parseInt(janitorId as string);
      }
      if (washroomId) {
        queryConditions["washroomId"] = parseInt(washroomId as string);
      }

      const activities = await activityLogRepo.find({
        where: queryConditions,
        relations: ["user", "washroom"],
      });

      res.status(200).json({
        message: "Activity logs retrieved successfully",
        data: activities,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
}
