import Publisher from "../entities/Publisher";
import { IPaginationResponse } from "./pagination-response";

export interface IGetPublishersResponse {
    pagination: IPaginationResponse,
    items: Publisher[] | []
}

