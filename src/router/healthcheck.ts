import express from "express";

import { healthcheck } from "../controllers/healthcheck.js";

export default (router: express.Router) =>
{
  /**
   * @swagger
   * /healthcheck:
   *   get:
   *     summary: Health check endpoint
   *     responses:
   *       200:
   *         description: Service is healthy
   */
  router.get("/healthcheck", healthcheck);
}