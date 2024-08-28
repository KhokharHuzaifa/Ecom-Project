import express from "express"
import {userController} from "../Controllers/user.controller.js"

const router = express.Router()

const user = new userController();

router.route("/user/all").get(user.getAllusers)
router.route("/user/userid").get(user.getSingleuser)
router.route("/user/newuser").post(user.createUser)
router.route("/user/delete").delete(user.deleteUser)
router.route("/user/update").put(user.updateUser)

export default router