export type AuthResp = {
    name?: String,
    email: String
    password?: String,
    googleId?: String,
    authType: "google" | "local",
}

export type MOM = {
    email: String
}

export type MOMType = {
    email: string;
    meeting_date: string;
    meeting_time: string;
    meeting_duration: number;
    meeting_topic: string;
    meeting_points: string[];
};