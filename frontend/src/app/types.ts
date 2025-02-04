export type AuthResp = {
    name?: String,
    email: String
    password?: String,
    googleId?: String,
    authType: "google" | "local",
}

