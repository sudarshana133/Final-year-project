type tokenPayload = {
    fresh: boolean;
    iat: number;
    jti: string;
    type: string;
    sub: {
        id: number;
        role: "admin" | "user";
    };
    nbf: number;
    csrf: string;
    exp: number;
}
export type { tokenPayload };