import { MongoClient } from './deps.ts';
import ItemController from './controllers/ItemController.ts';
import ListController from './controllers/ListController.ts';
import PriceController from './controllers/PriceController.ts';
import RefreshController from './controllers/RefreshController.ts';
import BltcService from './services/BltcService.ts';
import CookingService from './services/CookingService.ts';
import GwApiService from './services/GwApiService.ts';
import ItemService from './services/ItemService.ts';
import JewelcraftingService from './services/JewelcraftingService.ts';
import ListService from './services/ListService.ts';
import MongoService from './services/MongoService.ts';
import OpenService from './services/OpenService.ts';
import PriceService from './services/PriceService.ts';
import RefineService from './services/RefineService.ts';
import SalvageService from './services/SalvageService.ts';
import TradeService from './services/TradeService.ts';
import WeaponsmithService from './services/WeaponsmithService.ts';
import ArtificierService from "./services/ArtificierService.ts";
import RecipeService from "./services/RecipeService.ts";
import HuntsmanService from "./services/HuntsmanService.ts";
import TailorService from "./services/TailorService.ts";
import ArmorsmithService from "./services/ArmorsmithService.ts";
import LeatherworkerService from "./services/LeatherworkerService.ts";
import DailyController from "./controllers/DailyController.ts";
import DailyService from "./services/DailyService.ts";
import TpController from "./controllers/TpController.ts";
import TpService from "./services/TpService.ts";

interface Route {
    method: 'get' | 'post' | 'patch' | 'delete';
    route: string;
    handler: (req: any, res: any) => void;
}

const client = new MongoClient();
await client.connect('mongodb://root:example@mongo/');

const mongoService = new MongoService(client);
const gwApiService = new GwApiService();
const itemService = new ItemService(mongoService, gwApiService);
const priceService = new PriceService(mongoService, gwApiService);
const bltcService = new BltcService(mongoService, priceService);
const refineService = new RefineService();
const salvageService = new SalvageService();
const cookingService = new CookingService();
const openService = new OpenService();
const tradeService = new TradeService(itemService, priceService, bltcService);
const recipeService = new RecipeService();
const weaponsmithService = new WeaponsmithService(recipeService);
const jewelcraftingService = new JewelcraftingService();
const artificierService = new ArtificierService(recipeService);
const huntsmanService = new HuntsmanService(recipeService);
const tailorService = new TailorService();
const armorsmithService = new ArmorsmithService();
const leatherworkerService = new LeatherworkerService();
const dailyService = new DailyService(gwApiService);
const tpService = new TpService(gwApiService, itemService, priceService, bltcService);

const listService = new ListService(
    mongoService,
    tradeService,
    refineService,
    salvageService,
    cookingService,
    openService,
    weaponsmithService,
    jewelcraftingService,
    artificierService,
    huntsmanService,
    tailorService,
    armorsmithService,
    leatherworkerService,
);

const itemController = new ItemController(itemService);
const priceController = new PriceController(priceService);
const listController = new ListController(listService);
const refreshController = new RefreshController(
    itemService,
    priceService,
    bltcService,
    cookingService,
    openService,
    weaponsmithService,
    jewelcraftingService,
    artificierService,
    huntsmanService,
    tailorService,
    armorsmithService,
    leatherworkerService,
);
const dailyController = new DailyController(dailyService);
const tpController = new TpController(gwApiService, tpService);

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
        route: '/items/:id',
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
    {
        route: '/daily/',
        method: 'get',
        handler: (req, res) => dailyController.get(req, res),
    },
    {
        route: '/tp/current/sells',
        method: 'get',
        handler: (req, res) => tpController.getCurrentSells(req, res),
    },
    {
        route: '/tp/current/buys',
        method: 'get',
        handler: (req, res) => tpController.getCurrentBuys(req, res),
    },
    {
        route: '/tp/cancel/sells',
        method: 'get',
        handler: (req, res) => tpController.getCancelSells(req, res),
    },
    {
        route: '/tp/cancel/buys',
        method: 'get',
        handler: (req, res) => tpController.getCancelBuys(req, res),
    },
];
