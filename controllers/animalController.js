export const getAnimals = async (collection, request, reply) => {
  const result = await collection.find().toArray();

  if (result.length === 0) throw new Error("No documents found");

  return result;
};

export const getAnimal = async (collection, req, reply) => {
  const result = await collection.findOne({ animal: req.params.animal });
  if (!result) throw new Error("Invalid value");

  return result;
};

export const postAnimal = async (collection, req, reply) => {
  const result = await collection.insertOne({ animal: req.body.animal });

  return result;
};