exports.validateNote = (req, res, next) => {
    const {title, content} = req.body;

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
