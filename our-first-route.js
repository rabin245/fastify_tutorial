async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("test-collection");

  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello1: { type: "string" },
          },
        },
      },
    },
  };

  fastify.get("/", opts, async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/animals", async (request, reply) => {
    const result = await collection.find().toArray();

    if (result.length === 0) throw new Error("No documents found");

    return result;
  });

  const animalsOpt = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            animal: { type: "string" },
          },
        },
      },
    },
  };

  fastify.get("/animals/:animal", animalsOpt, async (req, reply) => {
    const result = await collection.findOne({ animal: req.params.animal });
    if (!result) throw new Error("Invalid value");

    return result;
  });

  const animalBodyJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: {
        type: "string",
      },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/animals", { schema }, async (req, reply) => {
    const result = await collection.insertOne({ animal: req.body.animal });

    return result;
  });
}

export { routes };
