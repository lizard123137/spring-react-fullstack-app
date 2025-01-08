import { User } from "../User";

export type LoginResponse = {
    user: User;
    token: string;
    refreshToken: string;
};