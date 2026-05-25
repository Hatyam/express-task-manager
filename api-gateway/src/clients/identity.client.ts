import axios from "axios";

const client = axios.create({
    baseURL: "http://identity-service:3000",
});

/**
 * AUTH
 */

// register
export const register = (data: any) => client.post("/auth/register", data);

// login
export const login = (data: any) => client.post("/auth/login", data);

// refresh (🔥 FIXED)
export const refresh = (params: { token?: string; cookie?: string }) =>
    client.post(
        "/auth/refresh",
        {},
        {
            headers: {
                Authorization: params.token,
                Cookie: params.cookie,
            },
            withCredentials: true,
        }
    );

/**
 * USERS
 */

// get all users
export const getAllUsers = (token?: string) =>
    client.get("/users", {
        headers: {
            Authorization: token,
        },
    });

// delete user
export const deleteUser = (id: string, token?: string) =>
    client.delete(`/users/${id}`, {
        headers: {
            Authorization: token,
        },
    });

// recover user
export const recoverUser = (id: string, token?: string) =>
    client.post(
        `/users/recover/${id}`,
        {},
        {
            headers: {
                Authorization: token,
            },
        }
    );
