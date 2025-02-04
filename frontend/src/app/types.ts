export type AuthResp = {
    name?: string,
    email: string
    password?: string,
    googleId?: string,
    authType: "google" | "local",
}

export type MOM = {
    email: string
}

export type MOMType = {
    email: string;
    meeting_date: string;
    meeting_time: string;
    meeting_duration: number;
    meeting_topic: string;
    meeting_points: string[];
};