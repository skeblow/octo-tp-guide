import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import ItemController from "./controllers/ItemController";
import GwApiService from "./services/GwApiService";
import ItemService from "./services/ItemService";
import MongoService from "./services/MongoService";

interface Route
{
    method: 'get'|'post'|'patch'|'delete';
    route: string;
    handler: (req: Request, res: Response) => void,
};

const client = new MongoClient('mongodb://root:example@localhost/');

const mongoService = new MongoService(client);
const gwApiService = new GwApiService();
const itemService = new ItemService(mongoService, gwApiService);
const itemController = new ItemController(itemService);

export const ROUTES: Route[] = [
    {
        route: '/items/',
        method: 'get',
        handler: (req, res) => itemController.getAll(req, res),
    },
    {
        route: "/items/:id",
        method: 'get',
        handler: (req, res) => itemController.get(req, res),
    },
    {
        route: '/prices/',
        method: 'get',
        handler: (req, res) => itemController.getPrices(req, res),
    },
];
