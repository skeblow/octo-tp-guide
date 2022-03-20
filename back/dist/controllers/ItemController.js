"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemController {
    constructor(itemService, gwApiService) {
        this.itemService = itemService;
        this.gwApiService = gwApiService;
    }
    getAll(req, res) {
        res.send('ass');
    }
    get(req, res) {
        const id = parseInt(req.params['id']);
        this.gwApiService.getItem(id)
            .then(item => res.send(item));
    }
}
exports.default = ItemController;
