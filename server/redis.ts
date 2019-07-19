import Redis from "ioredis"

export const redis = new Redis(process.env.redis) as any
