import express from "express";
import authentication from "./authentication";
import healthcheck from "./healthcheck";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  healthcheck(router);

  return router;
};
