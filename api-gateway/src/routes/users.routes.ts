import { Router } from "express";
import * as identityClient from "../clients/identity.client";

const router = Router();

const getToken = (req: any) => req.headers.authorization;

// GET ALL USERS
router.get("/", (req, res, next) =>
    identityClient
        .getAllUsers(getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

// DELETE USER
router.delete("/:id", (req, res, next) =>
    identityClient
        .deleteUser(req.params.id, getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

// RECOVER USER
router.post("/recover/:id", (req, res, next) =>
    identityClient
        .recoverUser(req.params.id, getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

export default router;
