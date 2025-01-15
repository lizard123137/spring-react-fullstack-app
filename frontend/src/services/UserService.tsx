import axios from "axios";
import { UserModel } from "../models/UserModel";
import { handleError } from "../helpers/ErrorHandler";

const api = "http://localhost:8080/api";

export const userAPI = async (id: string) => {
    try {
        const response = await axios.get<UserModel>(api + `/user/${id}`)
        return response;
    } catch (error) {
        handleError(error);
    }
}