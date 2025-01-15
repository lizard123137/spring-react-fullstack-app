import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { ChatModel } from "../models/ChatModel";

const api = "http://localhost:8080/api/chat"

export const chatAPI = async (name: String) => {
    try {
        const response = await axios.get<ChatModel>(api + `/${name}`);
        return response;
    } catch (error) {
        handleError(error);
    }
}