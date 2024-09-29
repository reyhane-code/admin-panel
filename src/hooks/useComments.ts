import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IGetCommentsResponse } from "../entities/Comment";

const useComments = (entityType: string, entityId: number) =>
    useQuery<IGetCommentsResponse, Error>({
        queryKey: ['comment', entityId, entityType],
        queryFn: async () => {
            try {
                const response = await HttpRequest.get<IGetCommentsResponse>(`/v1/comments/${entityType}/${entityId}`);
                return response.data;
            } catch (error) {
                throw new Error("Failed to fetch comments data");
            }
        },
    });

export default useComments;
