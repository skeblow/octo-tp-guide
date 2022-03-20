import { Request, Response } from "express";
import ItemController from "./controllers/ItemController";
import GwApiService from "./services/GwApiService";
import ItemService from "./services/ItemService";

interface Route
{
    method: 'get'|'post'|'patch'|'delete';
    route: string;
    handler: (req: Request, res: Response) => void,
};

const itemService = new ItemService();
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
