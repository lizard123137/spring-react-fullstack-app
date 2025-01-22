import { UserModel } from "../models/UserModel";
import { handleError } from "../helpers/ErrorHandler";
import { client } from "./AxiosService";


export const userAPI = async (username: string) => {
    try {
        const response = await client.get<UserModel>(`/user/${username}`)
        return response;
    } catch (error) {
        handleError(error);
    }
}