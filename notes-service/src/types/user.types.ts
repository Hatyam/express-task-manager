export type User = {
    id: number;
    email: string;
    password: string;
    role: string;
    token_version: number;
    deleted:boolean;
};

export type RegisteredUser = Pick<User, "id" | "email">;

export type AccessDecodedUser = Omit<User, "password" | "deleted">;

export type DeleteUserParams = {
    id: string;
}
