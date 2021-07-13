export interface authResponseServer {
    success: Boolean,
    message?: string,
    user?: userResponse,
    token?: string,
    expiresIn?: string;
}

export interface userResponse {
    username: string,
    hash: string,
    salt: string,
    email: string
}