const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/User");

userRouter.get("/", UserController.getAllUSers);
userRouter.get("/user/:name", UserController.getUserByName);
userRouter.post("/add", UserController.addUser);
userRouter.put("/update/:id", UserController.updateUser);
userRouter.delete("/delete/:name", UserController.deleteUser);

module.exports = userRouter;
