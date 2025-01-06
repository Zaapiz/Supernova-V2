declare module "express-session" {
  interface SessionData {
    username: string;
    userid: string;
    valid: boolean;
  }
}

export {};
