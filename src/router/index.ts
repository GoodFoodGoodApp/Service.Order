import express from "express";
import authentication from "./authentication.js";
import healthcheck from "./healthcheck.js";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  healthcheck(router);

  return router;
};
