import { Request, Response } from "express";
import RecipeService from "../services/RecipeService";

export default class RecipeController {
    constructor (
        private recipeService: RecipeService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        this.recipeService.getAll()
            .then(recipes => res.send(recipes));
    }
}
