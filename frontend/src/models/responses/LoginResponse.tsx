import { UserModel } from "../UserModel";

export type LoginResponse = {
    user: UserModel;
    token: string;
    refreshToken: string;
};