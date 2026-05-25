import { Router } from "express";
import * as identityClient from "../clients/identity.client";

const router = Router();

const getToken = (req: any) => req.headers.authorization;
const getCookie = (req: any) => req.headers.cookie;

// REGISTER
router.post("/register", (req, res, next) =>
    identityClient
        .register(req.body)
        .then((r) => res.json(r.data))
        .catch(next)
);

// LOGIN
router.post("/login", (req, res, next) =>
    identityClient
        .login(req.body)
        .then((r) => res.json(r.data))
        .catch(next)
);

// REFRESH (🔥 FIXED)
router.post("/refresh", (req, res, next) =>
    identityClient
        .refresh({
            token: getToken(req),
            cookie: getCookie(req),
        })
        .then((r) => {
            if (r.headers?.["set-cookie"]) {
                res.setHeader("Set-Cookie", r.headers["set-cookie"]);
            }
            res.json(r.data);
        })
        .catch(next)
);

export default router;
