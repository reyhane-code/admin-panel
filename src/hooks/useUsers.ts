import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IGetUsersResponse } from "../responses/get-users.response";


const useUsers = () =>
    useQuery(["users"], () =>
        HttpRequest.get<IGetUsersResponse>("/v1/user").then((res) => res.data)
    );

export default useUsers;
