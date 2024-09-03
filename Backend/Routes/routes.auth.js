import express from "express"
import { login, logout, signup } from "../Controllers/auth.controller.js"

const router = express.Router()

router.route("/auth/register").post(signup)
router.route("/auth/login").post(login)
router.route("/auth/logout").get(logout)

export default router