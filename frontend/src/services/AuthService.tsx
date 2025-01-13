import axios from "axios"
import { handleError } from "../helpers/ErrorHandler";
import { LoginRequest } from "../models/requests/LoginRequest";
import { RegisterRequest } from "../models/requests/RegisterRequest";
import { LoginResponse } from "../models/responses/LoginResponse";
import { RegisterResponse } from "../models/responses/RegisterResponse";

// This is confusing, but we are looking at this from the host browser perspective
const api = "http://localhost:8080/api/auth";

export const loginAPI = async (request: LoginRequest) => {
    try {
        const response = await axios.post<LoginResponse>(api + "/login", request);
        return response;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (request: RegisterRequest) => {
    try {
        const response = await axios.post<RegisterResponse>(api + "/register", request);
        return response;
    } catch (error) {
        handleError(error);
    }
}