import express from 'express';
import session  from 'express-session';
import cookieParser from 'cookie-parser';
import Controller from './interface/contoroller.interface';
import { MongoClient } from 'mongodb';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeController(controllers);
    this.connectToTheDatabase();
  };

  public listen() {
    this.app.listen(3000, () => {
      console.log("Application listening on the port: 3000");
    });
  };

  public getServer() {
    return this.app;
  };

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      name: "sid"
    }))
  };

  private initializeController(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  };

  private connectToTheDatabase() {
    const url = "mongodb://localhost:27017/";
    MongoClient.connect(url, (err, client) => {
      var db = client?.db("sample");
      db?.createCollection("test", (err, collection) => {
        client?.close();
      })
    })
  }
};

export default App;