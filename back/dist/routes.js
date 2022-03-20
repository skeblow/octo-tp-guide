"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
const ItemController_1 = __importDefault(require("./controllers/ItemController"));
const GwApiService_1 = __importDefault(require("./services/GwApiService"));
const ItemService_1 = __importDefault(require("./services/ItemService"));
;
const itemService = new ItemService_1.default();
const gwApiService = new GwApiService_1.default();
const itemController = new ItemController_1.default(itemService, gwApiService);
exports.ROUTES = [
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
