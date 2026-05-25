export type NoteIdParams = {
    id: string;
}

export type Note = {
    title: string;
    content: string;
}

export type UpdateNoteParams = {
    id: number;
    title: string;
    content: string;
    user_id: number;
};