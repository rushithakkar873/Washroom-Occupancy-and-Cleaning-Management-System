import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Washroom } from "../entities/Washroom";
import { AppDataSource } from "../data-source";
import { ActivityLogController } from "./ActivityLogController";
import { User } from "../entities/User";
import { WashroomStatus } from "../enum/common";

const userRepo: Repository<User> = AppDataSource.getRepository(User);
const washroomRepo: Repository<Washroom> =
  AppDataSource.getRepository(Washroom);

export class WashroomController {
  static createWashroom = async (req: Request, res: Response) => {
    try {
      const { name, status } = req.body;

      if (!name) {
        res
          .status(400)
          .json({ message: "Please enter all required fields value" });
        return;
      }

      const existingWashroom = await washroomRepo.findOne({ where: { name } });

      if (existingWashroom) {
        res.status(409).json({ message: "Washroom already exists" });
        return;
      }

      const newWashroom = washroomRepo.create({ name, status });
      const success = await washroomRepo.save(newWashroom);

      if (success) {
        res.status(201).json({
          message: "Washroom created successfully",
          data: newWashroom,
        });
      } else {
        throw new Error("Failed to create washroom");
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  static getWashroomsList = async (req: Request, res: Response) => {
    try {
      const washrooms = await washroomRepo.find();

      if (washrooms.length === 0) {
        res.status(404).json({ message: "No washrooms found" });
        return;
      }

      res.status(200).json({
        message: "Washrooms list retrieved successfully",
        data: washrooms,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  static getWashroom = async (req: Request, res: Response) => {
    try {
      const washroomId = req.params.id;
      const washroom = await washroomRepo.findOne({
        where: { id: parseInt(washroomId) },
      });

      if (!washroom) {
        res.status(404).json({ message: "Washroom not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Washroom retrieved successfully", data: washroom });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  static updateWashroomStatus = async (req: Request, res: Response) => {
    try {
      const washroomId = req.params.id;
      const { janitorEmail, status } = req.body;

      if (!status) {
        res.status(400).json({ message: "Status must be provided" });
        return;
      }

      const washroom = await washroomRepo.findOne({
        where: { id: parseInt(washroomId) },
      });

      if (!washroom) {
        res.status(404).json({ message: "Washroom not found" });
        return;
      }

      if (
        ((washroom.status === WashroomStatus.Cleaning ||
          status === WashroomStatus.Cleaning) &&
          !janitorEmail) ||
        status === WashroomStatus.Announcement
      ) {
        res
          .status(400)
          .json({ message: "Invalid action! Please verify yourself." });
      }

      washroom.status = status;
      const updatedWashroom = await washroomRepo.save(washroom);

      if (janitorEmail) {
        const janitor = await userRepo.findOne({
          where: { email: janitorEmail },
        });
        ActivityLogController.logActivity(
          status,
          washroom,
          janitor ?? undefined
        );
      } else {
        ActivityLogController.logActivity(status, washroom);
      }

      res.status(200).json({
        message: "Washroom status updated successfully",
        data: updatedWashroom,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
}
