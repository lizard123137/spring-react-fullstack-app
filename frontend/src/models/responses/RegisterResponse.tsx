import { UserModel } from "../UserModel";

export type RegisterResponse = {
    user: UserModel;
    token: String;
    refreshToken: String;
}