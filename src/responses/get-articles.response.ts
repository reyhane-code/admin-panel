import Article from "../entities/Article";
import { IPaginationResponse } from "./pagination-response";

export interface IGetArticlesResponse {
    pagination: IPaginationResponse,
    items: Article[],
}