import express from "express";
import { getOrders, 
        createOrder,
    // intent, confirm 
    } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";



const router = express.Router();


// router.get("/test", );

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
// router.post("/create-payment-intent/:id", verifyToken, intent);
// router.post("/:gigId", verifyToken, createOrder);
//router.put("/", verifyToken, confirm);


export default router;

