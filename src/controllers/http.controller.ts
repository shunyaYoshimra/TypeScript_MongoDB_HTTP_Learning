import { Request, Response, Router } from 'express';
import Controller from '../interface/contoroller.interface';

class HTTPController implements Controller {
  public path = '/http';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.httpCheck);
    this.router.get(`${this.path}/header`, this.setHeader);
  }

  private httpCheck(req: Request, res: Response) {
    let body: string;
    console.log(req.method);
    console.log(JSON.stringify(req.headers));
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(body);
    });
    res.send("OK");
  }

  private setHeader(req: Request, res: Response) {
    console.log(req.get("user-agent"));
    res.set("Cache-Control", "no-cache");
    res.set("Pragma", "no-cache");
    console.log(res.header);
    res.send("OK!!");
  }
};

export default HTTPController;