import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";

const dbConnector = async (fastify, options) => {
  fastify.register(fastifyMongodb, {
    url: "mongodb://localhost:27017/fastify-test",
  });
};

export default fastifyPlugin(dbConnector);
