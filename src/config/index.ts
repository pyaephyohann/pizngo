interface Config {
  googleClientId: string;
  googleClientSecret: string;
  apiBaseUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
