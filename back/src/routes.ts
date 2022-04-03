import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import ItemController from "./controllers/ItemController";
import ListController from "./controllers/ListController";
import PriceController from "./controllers/PriceController";
import BltcService from "./services/BltcService";
import GwApiService from "./services/GwApiService";
import ItemService from "./services/ItemService";
import ListService from "./services/ListService";
import MongoService from "./services/MongoService";
import PriceService from "./services/PriceService";

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
const priceService = new PriceService(mongoService, gwApiService);
const bltcService = new BltcService(mongoService);
const listService = new ListService(mongoService, itemService, priceService, bltcService);

const itemController = new ItemController(itemService, priceService, bltcService);
const priceController = new PriceController(priceService);
const listController = new ListController(listService);

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
        route: "/bltc/",
        method: 'get',
        handler: (req, res) => itemController.getBltc(req, res),
    },
    {
        route: '/prices/',
        method: 'get',
        handler: (req, res) => priceController.get(req, res),
    },
    {
        route: '/lists/:type',
        method: 'get',
        handler: (req, res) => listController.get(req, res),
    },
    {
        route: '/refresh/',
        method: 'get',
        handler: (req, res) => itemController.refresh(req, res),
    },
];
