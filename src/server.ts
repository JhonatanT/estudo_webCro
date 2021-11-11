import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
//import { router } from "./routes"
import cors from "cors";

const puppeteer = require('puppeteer');
const fs = require('fs');




const app = express();

app.use(cors())

app.use(express.json())

app.listen(3030, () => console.log('Rodando na porta 3030'))