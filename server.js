import Fastify from "fastify";

// instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
});

// declare route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

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
