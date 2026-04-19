import { AccessDecodedUser } from "./user.types";

declare global {
    namespace Express {
        interface Request {
            user: AccessDecodedUser;
        }
    }
}
