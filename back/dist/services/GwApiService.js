"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class GwApiService {
    constructor() {
        this.BASE_URL = 'https://api.guildwars2.com/v2';
    }
    getItem(id) {
        return (0, node_fetch_1.default)(this.BASE_URL + '/items/' + id)
            .then((res) => res.json());
    }
}
exports.default = GwApiService;
