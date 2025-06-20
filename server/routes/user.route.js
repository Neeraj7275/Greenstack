import express from "express"
import { isAuth, login, logout, register } from "../controllers/user.controller.js";
import  authUser from "../middlewares/authUser.middleware.js";
const router  = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/is-auth",authUser,isAuth);
router.post("/logout",authUser,logout);

export default router;