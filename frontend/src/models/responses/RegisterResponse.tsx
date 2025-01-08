import { User } from "../User";

export type RegisterResponse = {
    user: User;
    token: String;
    refreshToken: String;
}