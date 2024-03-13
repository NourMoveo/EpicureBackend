import { Request, Response } from "express";

class BaseController {
  static getBase(req: Request, res: Response) {
    res.send("Hello World!");
  }
}

export default BaseController;
