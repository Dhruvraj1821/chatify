import express from "express";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection,protectRoute); //this middlewares execute in order so reqs get rate limited first then authenticated
//more efficient because unauthenticated requests get blocked by rate limiting before hitting the auth middleware


router.get("/contacts", getAllContacts);

router.get("/chats",getChatPartners);

router.get("/:id",getMessagesByUserId);

router.post("/send/:id",sendMessage);

export default router;