import { UserModel } from "./UserModel"

export type ChatModel = {
    id: string,
    admin: UserModel,
    users: Array<UserModel>,
};