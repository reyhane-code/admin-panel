import { IPaginationResponse } from "../responses/pagination-response";

export interface IGetCommentsResponse2 {
    pagination: IPaginationResponse;
    items: Comment[];
    likes: [{ comment_id: number, count: number }]
}

interface Comment {
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
    user: {
        id: number
        username: string
        first_name: string
        last_name: string
    }
}



export default Comment