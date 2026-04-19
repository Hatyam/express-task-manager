-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role TEXT DEFAULT 'user',
    deleted BOOLEAN DEFAULT FALSE,
    token_version INTEGER DEFAULT 0
);

-- NOTES
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT notes_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- REFRESH TOKENS
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    token_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    replaced_by INTEGER,

    CONSTRAINT refresh_tokens_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT refresh_tokens_replaced_by_fkey
        FOREIGN KEY (replaced_by)
        REFERENCES refresh_tokens(id)
);

-- INDEXES
CREATE INDEX idx_refresh_search
ON refresh_tokens (user_id, token_hash, revoked, expires_at);