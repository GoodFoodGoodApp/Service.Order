import express from "express";

import { login, register } from "../controllers/authentication.js";

export default (router: express.Router) => {
  /**
   * @openapi
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - username
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email
   *               password:
   *                 type: string
   *                 description: User's password
   *               username:
   *                 type: string
   *                 description: User's username
   *     responses:
   *       200:
   *         description: User registered successfully
   *       400:
   *         description: Missing required fields or invalid input
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/register", register);
  
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login a user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email
   *               password:
   *                 type: string
   *                 description: User's password
   *     responses:
   *       200:
   *         description: User logged in successfully
   *       400:
   *         description: Missing required fields or invalid input
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/login", login);
};
