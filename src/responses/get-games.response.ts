import { IPaginationResponse } from "./pagination-response";

export interface IGetGamesResponse {
    pagination: IPaginationResponse,
    items: {
        id: number;
        name: string;
        slug: string;
        description: string;
        background_image: string;
        rating_top: number;
        metacritic: number;
    }[];
}