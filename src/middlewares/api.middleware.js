export function middleware(req, res, next) {
  console.log("req accepted:", req.method, req.originalUrl);
  next();
}