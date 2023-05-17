import Fastify from "fastify";
import { routes as firstRoute } from "./our-first-route.js";

// instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
});

// register routes
fastify.register(firstRoute);

// run server
const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
