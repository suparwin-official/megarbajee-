const users = new Map();

export const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;

  const current = users.get(ip) || 0;

  if (current > 100) {
    return res.status(429).json({ message: "Too many requests" });
  }

  users.set(ip, current + 1);

  setTimeout(() => {
    users.set(ip, current - 1);
  }, 1000 * 60);

  next();
};
