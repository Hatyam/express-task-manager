import axios from "axios";

const client = axios.create({
    baseURL: "http://notes-service:3000",
});

/**
 * NOTES
 */

// all notes
export const getAllNotes = (token?: string) =>
    client.get("/notes", {
        headers: {
            Authorization: token,
        },
    });

// one note
export const getOneNote = (id: string, token?: string) =>
    client.get(`/notes/${id}`, {
        headers: {
            Authorization: token,
        },
    });

// create note
export const createNote = (token: string, data: any) =>
    client.post("/notes", data, {
        headers: {
            Authorization: token,
        },
    });

// update note
export const updateNote = (id: string, token: string, data: any) =>
    client.put(`/notes/${id}`, data, {
        headers: {
            Authorization: token,
        },
    });

// delete note
export const deleteNote = (id: string, token: string) =>
    client.delete(`/notes/${id}`, {
        headers: {
            Authorization: token,
        },
    });

// admin: all users notes
export const getAllUsersNotes = (token?: string) =>
    client.get("/notes/getAllUsersNotes", {
        headers: {
            Authorization: token,
        },
    });

/**
 * INTERNAL (service-to-service)
 */

// delete by user
export const deleteByUser = (data: any) =>
    client.post("/internal/notes/delete-by-user", data);

// recover by user
export const recoverByUser = (data: any) =>
    client.post("/internal/notes/recover-by-user", data);
