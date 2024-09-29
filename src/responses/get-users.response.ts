import User from "../entities/User";
import { IPaginationResponse } from "./pagination-response";

export interface IGetUsersResponse {
    pagination: IPaginationResponse,
    items: User[] | []
}

