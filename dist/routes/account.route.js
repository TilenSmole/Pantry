"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_controller_1 = require("../controllers/account.controller");
const middleweartester_1 = require("../middleweartester");
const express = require("express");
const router = express.Router();
router.get("/", middleweartester_1.authenticateMiddleware, account_controller_1.getAccount);
router.get("/get-data-mobile", middleweartester_1.authenticateMiddlewareM, account_controller_1.getAccountM);
module.exports = router;
