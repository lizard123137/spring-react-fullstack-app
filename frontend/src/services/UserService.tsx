import { UserModel } from "../models/UserModel";
import { handleError } from "../helpers/ErrorHandler";
import { client } from "./AxiosService";


export const userAPI = async (id: string) => {
    try {
        const response = await client.get<UserModel>(`/user/${id}`)
        return response;
    } catch (error) {
        handleError(error);
    }
}