import axios from "axios";
import { User } from "../models/User";
import { handleError } from "../helpers/ErrorHandler";

const api = "http://localhost:8080/api";

export const userAPI = async (id: string) => {
    try {
        const response = await axios.get<User>(api + `/user/${id}`)
        return response;
    } catch (error) {
        handleError(error);
    }
}