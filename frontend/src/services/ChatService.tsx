import { handleError } from "../helpers/ErrorHandler";
import { ChatModel } from "../models/ChatModel";
import { client } from "./AxiosService";

export const chatAPI = async (name: String) => {
    try {
        const response = await client.get<ChatModel>(`chat/${name}`);
        return response;
    } catch (error) {
        handleError(error);
    }
}