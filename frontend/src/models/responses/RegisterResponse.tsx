import { UserModel } from "../UserModel";

export type RegisterResponse = {
    user: UserModel;
    accessToken: string;
    refreshToken: string;
}