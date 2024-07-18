import { getRecepies } from "../controllers/recipes.controller";
 // import verifyAccessToken from "../../middlewares/verifyToken"
  const express = require("express")
  
  const router = express.Router()
  console.log("Reached /recipes endpoint");

  router.get("/", getRecepies)
  console.log("Reached /recipes endpoint");


  module.exports = router
  