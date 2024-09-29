import Genre from "../entities/Genre";
import { IPaginationResponse } from "./pagination-response";

export interface IGetGenresResponse {
    pagination: IPaginationResponse,
    items: Genre[] | []
}

