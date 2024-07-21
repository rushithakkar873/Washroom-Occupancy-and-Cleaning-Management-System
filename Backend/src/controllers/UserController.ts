import { Request, Response } from "express";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../config";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UserRole } from "../enum/common";

const { secret_key } = config;
const userRepo: Repository<User> = AppDataSource.getRepository(User);

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, age, role } = req.body;

      if (!name || !email || !age || !role) {
        res.status(400).json({ message: "Please enter all the fields value" });
        return;
      }

      // Check if the user already exists
      const existingUser = await userRepo.findOne({ where: { email } });

      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      // Generate access id
      const accessId = Math.floor(100000 + Math.random() * 900000).toString();

      // Encrypt the access id
      const hashedAccessId = await bcrypt.hash(accessId, 10);

      // Create and save the new user
      const newUser = userRepo.create({
        name,
        email,
        age,
        accessId: hashedAccessId,
        role,
      });
      const success = await userRepo.save(newUser);
      if (success) {
        res.status(201).json({
          message: "User registered successfully",
          data: newUser,
          access_id: accessId,
        });
      } else {
        throw new Error("User registration failed");
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  static verifyUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, accessId } = req.body;

      if ((!name && !email) || !accessId) {
        res.status(400).json({ message: "Please enter all the fields value" });
        return;
      }

      // Find user by name/email
      let user;
      if (name) {
        user = await userRepo.findOne({ where: { name } });
      } else {
        user = await userRepo.findOne({ where: { email } });
      }
      if (!user) {
        res.status(401).json({ message: "User does not exist" });
        return;
      }

      // Check if the access id is correct
      const isMatch = await bcrypt.compare(accessId, user.accessId);
      if (!isMatch) {
        res.status(401).json({ message: "Incorrect access id" });
        return;
      }

      // User authenticated, generate a JWT
      const token = jwt.sign(
        { userId: user.id, username: user.email },
        secret_key as string,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Verified successfully",
        email: user.email,
        access_token: email ? token : null,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  static getJanitorsList = async (req: Request, res: Response) => {
    try {
      const janitors = await userRepo.find({
        where: { role: UserRole.Janitor },
      });

      if (janitors.length === 0) {
        res.status(404).json({ message: "No janitors found" });
        return;
      }

      res.status(200).json({
        message: "Janitors list retrieved successfully",
        data: janitors,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
}
