import { Recipe, RecipeType } from '../../../shared/index.ts';

export default class RefineService {
    async getAll(): Promise<Array<Recipe>> {
        return [
            {
                // bolt of jute
                id: 19720,
                type: RecipeType.refine,
                input: [
                    { id: 19718, quantity: 2 },
                ],
                output: [
                    { id: 19720, quantity: 1 },
                ],
            },
            {
                // bolt of wool
                id: 19740,
                type: RecipeType.refine,
                input: [
                    { id: 19739, quantity: 2 },
                ],
                output: [
                    { id: 19740, quantity: 1 },
                ],
            },
            {
                // bolt of cotton
                id: 19742,
                type: RecipeType.refine,
                input: [
                    { id: 19741, quantity: 2 },
                ],
                output: [
                    { id: 19742, quantity: 1 },
                ],
            },
            {
                // bolt of linen
                id: 19744,
                type: RecipeType.refine,
                input: [
                    { id: 19743, quantity: 2 },
                ],
                output: [
                    { id: 19744, quantity: 1 },
                ],
            },
            {
                // bolt of silk
                id: 19747,
                type: RecipeType.refine,
                input: [
                    // silk scrap
                    { id: 19748, quantity: 3 },
                ],
                output: [
                    { id: 19747, quantity: 1 },
                ],
            },
            {
                // bolt of gossamer
                id: 19746,
                type: RecipeType.refine,
                input: [
                    // gossamer scrap
                    { id: 19745, quantity: 2 },
                ],
                output: [
                    { id: 19746, quantity: 1 },
                ],
            },
            {
                // rawhide leather square
                id: 19738,
                type: RecipeType.refine,
                input: [
                    { id: 19719, quantity: 2 },
                ],
                output: [
                    { id: 19738, quantity: 1 },
                ],
            },
            {
                // thin leather square
                id: 19733,
                type: RecipeType.refine,
                input: [
                    { id: 19728, quantity: 2 },
                ],
                output: [
                    { id: 19733, quantity: 1 },
                ],
            },
            {
                // coarse leather square
                id: 19734,
                type: RecipeType.refine,
                input: [
                    { id: 19730, quantity: 2 },
                ],
                output: [
                    { id: 19734, quantity: 1 },
                ],
            },
            {
                // rugged leather square
                id: 19736,
                type: RecipeType.refine,
                input: [
                    { id: 19731, quantity: 2 },
                ],
                output: [
                    { id: 19736, quantity: 1 },
                ],
            },
            {
                // thick leather square
                id: 19735,
                type: RecipeType.refine,
                input: [
                    // thick leather section
                    { id: 19729, quantity: 4 },
                ],
                output: [
                    { id: 19735, quantity: 1 },
                ],
            },
            {
                // hardened leather square
                id: 19737,
                type: RecipeType.refine,
                input: [
                    // hardened leather section
                    { id: 19732, quantity: 3 },
                ],
                output: [
                    { id: 19737, quantity: 1 },
                ],
            },
            {
                // copper ingot
                id: 19680,
                type: RecipeType.refine,
                input: [
                    { id: 19697, quantity: 2 },
                ],
                output: [
                    { id: 19680, quantity: 1 },
                ],
            },
            {
                // bronze ingot
                id: 19679,
                type: RecipeType.refine,
                input: [
                    { id: 19697, quantity: 2 },
                ],
                output: [
                    { id: 19679, quantity: 1 },
                ],
                cost: 8 / 5,
            },
            {
                // iron ingot
                id: 19683,
                type: RecipeType.refine,
                input: [
                    { id: 19699, quantity: 3 },
                ],
                output: [
                    { id: 19683, quantity: 1 },
                ],
            },
            {
                // steel ingot
                id: 19683,
                type: RecipeType.refine,
                input: [
                    { id: 19699, quantity: 3 },
                    { id: 19750, quantity: 1 },
                ],
                output: [
                    { id: 19688, quantity: 1 },
                ],
            },
            {
                // silver ingot
                id: 19687,
                type: RecipeType.refine,
                input: [
                    { id: 19703, quantity: 2 },
                ],
                output: [
                    { id: 19687, quantity: 1 },
                ],
            },
            {
                // gold ingot
                id: 19682,
                type: RecipeType.refine,
                input: [
                    { id: 19698, quantity: 2 },
                ],
                output: [
                    { id: 19682, quantity: 1 },
                ],
            },
            {
                // platinum ingot
                id: 19686,
                type: RecipeType.refine,
                input: [
                    { id: 19702, quantity: 2 },
                ],
                output: [
                    { id: 19686, quantity: 1 },
                ],
            },
            {
                // darksteel ingot
                id: 19681,
                type: RecipeType.refine,
                input: [
                    { id: 19702, quantity: 2 },
                    { id: 19924, quantity: 1 },
                ],
                output: [
                    { id: 19681, quantity: 1 },
                ],
            },
            {
                // mithril ingot
                id: 19684,
                type: RecipeType.refine,
                input: [
                    // mithril ore
                    { id: 19700, quantity: 2 },
                ],
                output: [
                    { id: 19684, quantity: 1 },
                ],
            },
            {
                // orichalcum ingot
                id: 19685,
                type: RecipeType.refine,
                input: [
                    { id: 19701, quantity: 2 },
                ],
                output: [
                    { id: 19685, quantity: 1 },
                ],
            },
            {
                // green wood plank
                id: 19710,
                type: RecipeType.refine,
                input: [
                    { id: 19723, quantity: 3 },
                ],
                output: [
                    { id: 19710, quantity: 1 },
                ],
            },
            {
                // soft wood plank
                id: 19713,
                type: RecipeType.refine,
                input: [
                    { id: 19726, quantity: 2 },
                ],
                output: [
                    { id: 19713, quantity: 1 },
                ],
            },
            {
                // seasoned wood plank
                id: 19714,
                type: RecipeType.refine,
                input: [
                    { id: 19727, quantity: 3 },
                ],
                output: [
                    { id: 19714, quantity: 1 },
                ],
            },
            {
                // hard wood plank
                id: 19711,
                type: RecipeType.refine,
                input: [
                    { id: 19724, quantity: 3 },
                ],
                output: [
                    { id: 19711, quantity: 1 },
                ],
            },
            {
                // elder wood plank
                id: 19709,
                type: RecipeType.refine,
                input: [
                    { id: 19722, quantity: 3 },
                ],
                output: [
                    { id: 19709, quantity: 1 },
                ],
            },
            {
                // ancient wood plank
                id: 19712,
                type: RecipeType.refine,
                input: [
                    { id: 19725, quantity: 3 },
                ],
                output: [
                    { id: 19712, quantity: 1 },
                ],
            },
        ];
    }
}
