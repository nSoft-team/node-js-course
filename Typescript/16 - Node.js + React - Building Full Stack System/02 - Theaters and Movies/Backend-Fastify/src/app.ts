import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import { fastify } from 'fastify';
import controllers from "./routers/controllers";

const server = fastify({ logger: true });

server.register(controllers, { prefix: '/api'});

const start = async () => {
  try {
    await server.listen({ port: 3001 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }

  server.log.info(`server listening...`)
}
start();