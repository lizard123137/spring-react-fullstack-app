import { UserModel } from "../UserModel";

export type LoginResponse = {
    user: UserModel;
    accessToken: string;
    refreshToken: string;
};