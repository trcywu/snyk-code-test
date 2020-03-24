import bodyParser from "body-parser";
import express from "express";
import { getPackage } from "./routes/packages";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/packages/:name", getPackage);

app.listen(port, () => console.log(`Listening on port ${port}`));
