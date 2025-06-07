export interface EnvConfig {
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    NODE_ENV: "development" | "production" | "test" | string;
    BCRYPT_SALT_ROUNDS:number;
}