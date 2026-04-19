import { Request, Response, NextFunction } from "express";

type NoteBody = {
    title?: string;
    content?: string;
};

export const validateNote = (
    req: Request<{}, {}, NoteBody>,
    res: Response,
    next: NextFunction
) => {
    const { title, content } = req.body;

    if (
        typeof title !== "string" ||
        typeof content !== "string" ||
        title.trim() === "" ||
        content.trim() === ""
    ) {
        return res.status(400).json({ message: "Invalid note data" });
    }

    next();
};
