import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,

  // maxRetriesPerRequest: null, 
  // enableReadyCheck: false,
  
 
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redis.on("connect", () => {
  console.log("🚀 Redis: Connection attempt started...");
});

redis.on("ready", () => {
  console.log("✅ Redis: Server is ready and authenticated!");
});

redis.on("error", (err) => {
  console.log("Detailed Error:", {
    code: err.code,
    message: err.message,
    stack: err.stack?.split('\n')[0] 
  });
});

export default redis;