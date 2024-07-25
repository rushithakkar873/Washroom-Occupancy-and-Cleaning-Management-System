import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import config from "./config";
import Routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const { port } = config;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://washroom-occupancy-and-cleaning-management-system.vercel.app"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

Routes.forEach((route) => {
  if (route.middleware) {
    (app as any)[route.method](route.route, route.middleware, route.action);
  } else {
    (app as any)[route.method](route.route, route.action);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hlwwwww123");
});

app.listen(port || 4000, () => {
  console.log(`Server running on port ${port}`);
});
