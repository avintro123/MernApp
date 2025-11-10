import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");

        if (!success) {
            return res.status(429).send("Too many requests");
        }
        next();
    } catch (err) {
        res.status(500).send("Server Error");
    }
}
export default rateLimiter;