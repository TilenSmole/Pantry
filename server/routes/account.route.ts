import { getAccount } from "../controllers/account.controller";
import   {authenticateMiddleware}  from "../middleweartester"


  const express = require("express")
  
  const router = express.Router()

  router.get("/",authenticateMiddleware, getAccount)



  module.exports = router
  