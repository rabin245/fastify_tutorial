import {
  getAnimal,
  getAnimals,
  postAnimal,
} from "../controllers/animalController.js";

export const animalRoutes = async (fastify, options) => {
  const collection = fastify.mongo.db.collection("test-collection");

  const animalJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: { type: "string" },
    },
  };

  const getAnimalsOpt = {
    schema: {
      response: {
        200: {
          type: "array",
          items: animalJsonSchema,
        },
      },
    },
    handler: getAnimals.bind(null, collection),
  };

  const getAnimalOpt = {
    schema: {
      response: {
        200: animalJsonSchema,
      },
    },
    handler: getAnimal.bind(null, collection),
  };

  const postAnimalOpt = {
    schema: {
      body: animalJsonSchema,
    },
    handler: postAnimal.bind(null, collection),
  };

  fastify.get("/animals", getAnimalsOpt);

  fastify.get("/animals/:animal", getAnimalOpt);

  fastify.post("/animals", postAnimalOpt);
};
