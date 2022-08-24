# Middleware
- A middleware is a function which we can execute automatically on one route or on all routes.
- The middleware function gets three arguments: `request, response, next`.
- In the middleware we must call the `next` function to forward the http request to the next middleware or route or to return a response, where in that case the middleware will stop the http request from continuing to the next middleware or route, otherwise the http request will be blocked.
- Note: A Middleware MUST be registered (`server.use` / `router.use`) *BEFORE* the route function and not after, or it won't be called at all.
