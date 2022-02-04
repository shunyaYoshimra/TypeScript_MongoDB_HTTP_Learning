import { Request, Response, Router } from "express";
import Controller from "../interface/contoroller.interface";

class CookieController implements Controller {
  public path = "/cookie";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.cookie);
  }

  private cookie(req: Request, res: Response) {
    let count = parseInt(req.cookies.count || 0);
    res.cookie("count", count + 1);
    res.json({
      message: "OK",
      data: count
    });
  }
}

export default CookieController;