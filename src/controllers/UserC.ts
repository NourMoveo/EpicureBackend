import { Request, Response } from "express";
import { Model } from "mongoose";
import { UserI } from "../models/user";
import UserService from "../services/userS";
import GenericController from "./GenericController";

class UserController extends GenericController<UserI> {
  private UserService: UserService;

  constructor(model: Model<UserI>) {
    super(model);
    this.UserService = new UserService(model);
  }


}

export default UserController;
