import express from "express";

import { healthcheck } from "../controllers/healthcheck.js";

export default (router: express.Router) =>
{ 
    router.get("/healthcheck", healthcheck);
}