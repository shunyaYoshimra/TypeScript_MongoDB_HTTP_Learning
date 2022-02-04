import { Request, Response, Router } from "express";
import Controller from "../interface/contoroller.interface";
import 'express-session';
declare module 'express-session' {
  interface SessionData {
    count: number;
  }
}

class SessionController implements Controller {
  public path = "/session";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.session);
  }

  private session(req: Request, res: Response) {
    let count = req.session.count || 0;
    req.session.count = count + 1;
    res.json({
      message: "OK!",
      data: count
    })
  }
};

export default SessionController;