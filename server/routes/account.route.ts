import { getAccount ,getAccountM } from "../controllers/account.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"


  const express = require("express")
  
  const router = express.Router()

  router.get("/",authenticateMiddleware, getAccount)

  router.get("/get-data-mobile", authenticateMiddlewareM, getAccountM)

  module.exports = router
  