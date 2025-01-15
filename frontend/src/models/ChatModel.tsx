import { UserModel } from "./UserModel"

export type ChatModel = {
    id: String,
    admin: UserModel,
    users: Array<UserModel>,
};