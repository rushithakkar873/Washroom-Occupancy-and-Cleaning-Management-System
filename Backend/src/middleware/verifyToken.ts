import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const { secret_key } = config;

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Missing Token' });
        }

        const decoded = jwt.verify(token, secret_key as string) as jwt.JwtPayload;
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        const { email } = decoded;
        
        const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'User does not exist' });
            return;
        }

        req.body.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
