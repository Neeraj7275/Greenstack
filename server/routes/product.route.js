import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import authSeller from "../middlewares/authSeller.middleware.js";
import { addProduct, changeStock, productById, productList } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/add",upload.array("images"),authSeller,addProduct);
router.get("/list",productList);
router.get("/id",productById);
router.post("/stock",authSeller,changeStock);

export default router;