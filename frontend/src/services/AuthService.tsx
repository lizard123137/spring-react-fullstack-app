import { handleError } from "../utils/ErrorHandler";
import { LoginRequest } from "../models/requests/LoginRequest";
import { RegisterRequest } from "../models/requests/RegisterRequest";
import { LoginResponse } from "../models/responses/LoginResponse";
import { RegisterResponse } from "../models/responses/RegisterResponse";
import { client } from "./AxiosService";

export const loginAPI = async (request: LoginRequest) => {
    try {
        const response = await client.post<LoginResponse>("/auth/login", request);
        return response;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (request: RegisterRequest) => {
    try {
        const response = await client.post<RegisterResponse>("/auth/register", request);
        return response;
    } catch (error) {
        handleError(error);
    }
}