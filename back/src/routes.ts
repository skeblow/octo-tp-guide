import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import ItemController from "./controllers/ItemController";
import GwApiService from "./services/GwApiService";
import ItemService from "./services/ItemService";

interface Route
{
    method: 'get'|'post'|'patch'|'delete';
    route: string;
    handler: (req: Request, res: Response) => void,
};

const client = new MongoClient('mongodb://root:example@localhost/');

const itemService = new ItemService(client);
const gwApiService= new GwApiService();
const itemController = new ItemController(itemService, gwApiService);

export const ROUTES: Route[] = [
    {
        route: '/',
        method: 'get',
        handler: (req, res) => itemController.getAll(req, res),
    },
    {
        route: "/items/:id",
        method: 'get',
        handler: (req, res) => itemController.get(req, res),
    },
];
