import { IPaginationResponse } from "./pagination-response";

export default interface IGetCommentsResponse {
    pagination: IPaginationResponse
    items: {
        id: number;
        content: string;
        user_id: number;
        game_id: number | null;
        article_id: number | null;
        entity_type: string;
        confirmed: boolean
        parent_id: number | null
        parent_user_id: number | null
        createdAt: Date
        updatedAt: Date
        deletedAt: Date | null
    }[] | []
}