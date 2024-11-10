import express from "express";

export const healthcheck = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    res.status(200).json({
      message: "Server is healthy",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while checking server health",
    });
  }
};
