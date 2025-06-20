import express from "express";
import { isAuthSeller, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";
import authSeller from "../middlewares/authSeller.middleware.js";

const router = express.Router();

router.post("/login",sellerLogin);
router.get("/is-authSeller",authSeller,isAuthSeller);
router.post("/logout",authSeller,sellerLogout);

export default router;