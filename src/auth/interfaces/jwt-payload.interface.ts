export interface JwtPayload {
    username?: string;
    id: string;
    sub: string;
    iat: number;
    exp: number;
}