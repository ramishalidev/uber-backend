import { Request, Response } from "express";

export const homeController = (req: Request, res: Response): void => {
  res.json({
    message: "Welcome to Uber Backend API",
    status: "success",
    timestamp: new Date().toISOString(),
  });
};

export const healthController = (req: Request, res: Response): void => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
