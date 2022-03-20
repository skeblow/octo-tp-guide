"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3000;
for (let route of routes_1.ROUTES) {
    switch (route.method) {
        case 'get':
            app.get(route.route, route.handler);
            break;
        case 'post':
            app.post(route.route, route.handler);
            break;
        case 'patch':
            app.patch(route.route, route.handler);
            break;
        case 'delete':
            app.delete(route.route, route.handler);
            break;
        default:
            throw 'not handled method! (' + route.method + ')';
    }
}
app.listen(port, () => {
    console.log('app started on http://localhost:' + port);
});
