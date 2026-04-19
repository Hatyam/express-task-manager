export type CookieRefreshToken = {
    refresh_token?: string;
}

export type RefreshTokenReturn = {
    newRefreshToken: string;
    newAccessToken: string;
}

export type RefreshTokenFromDataBase = {
    id: number;
    user_id: number;
    token_hash: string;
    expires_at: string;
    revoked: boolean;
    replaced_by: number;
}