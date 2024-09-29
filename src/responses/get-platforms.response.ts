import Platform from "../entities/Platform";
import { IPaginationResponse } from "./pagination-response";

export interface IGetPlatformsResponse {
    pagination: IPaginationResponse,
    items: Platform[] | []
}

