import { IPaginationResponse } from "./pagination-response";

export interface IGetGamesResponse {
    pagination: IPaginationResponse,
    items: {
        id: number;
        name: string;
        slug: string;
        description: string;
        background_image: string;
        metacritic: number;
        rating_top: number;
        platforms: {
            id: number;
            name: string;
            slug: string;
        }[];
        genres: {
            id: number;
            name: string;
        }[];
        publishers: {
            id: number;
            name: string;
        }[];
    }[];
    likes: [{ game_id: number, count: number }]
}