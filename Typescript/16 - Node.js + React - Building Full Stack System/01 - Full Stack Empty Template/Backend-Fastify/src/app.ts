import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import { fastify } from 'fastify';
import routes from "./routes/controllers";

const server = fastify({ logger: true });

//const PORT = process.env.PORT ?? 3001;

server.register(routes, { prefix: '/api'});

const start = async () => {
  try {
    await server.listen({ port: 3001 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }

  server.log.info(`server listening on 3001`)
}
start();
