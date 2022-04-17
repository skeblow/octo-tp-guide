import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import ItemController from "./controllers/ItemController";
import ListController from "./controllers/ListController";
import PriceController from "./controllers/PriceController";
import RefreshController from "./controllers/RefreshController";
import BltcService from "./services/BltcService";
import CookingService from "./services/CookingService";
import GwApiService from "./services/GwApiService";
import ItemService from "./services/ItemService";
import ListService from "./services/ListService";
import MongoService from "./services/MongoService";
import OpenService from "./services/OpenService";
import PriceService from "./services/PriceService";
import RefineService from "./services/RefineService";
import SalvageService from "./services/SalvageService";
import TradeService from "./services/TradeService";
import UtilityService from "./services/UtilityService";

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
const bltcService = new BltcService(mongoService, priceService);
const refineService = new RefineService();
const salvageService = new SalvageService();
const cookingService = new CookingService();
const utilityService = new UtilityService();
const openService = new OpenService();
const tradeService = new TradeService(itemService, priceService, bltcService);
const listService = new ListService(
    mongoService,
    tradeService,
    refineService,
    salvageService,
    cookingService,
    utilityService,
    openService,
);

const itemController = new ItemController(itemService);
const priceController = new PriceController(priceService);
const listController = new ListController(listService);
const refreshController = new RefreshController(
    itemService,
    priceService,
    bltcService,
    cookingService,
    utilityService,
    openService,
);

export const ROUTES: Route[] = [
    {
        route: '/',
        method: 'get',
        handler: (req, res) => res.send('ass'),
    },
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
        handler: (req, res) => refreshController.refresh(req, res),
    },
];
