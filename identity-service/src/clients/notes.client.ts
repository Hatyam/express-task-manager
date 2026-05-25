import axios from "axios";

const NOTES_SERVICE_URL =
    process.env.NOTES_SERVICE_URL || "http://notes-service:3002";

export const deleteNotesByUserId = async (userId: number) => {
    await axios.post(`${NOTES_SERVICE_URL}/internal/notes/delete-by-user`, {
        userId,
    });
};

export const recoverNotesByUserId = async (userId: number) => {
    await axios.post(`${NOTES_SERVICE_URL}/internal/notes/recover-by-user`, {
        userId,
    });
};
