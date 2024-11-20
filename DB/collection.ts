import clientPromise from "./Connector";

const getCollection = async () => {
  const client = await clientPromise;
  const db = client?.db("flavourbot");
  return await db?.collection("flavourbot");
};
export default getCollection;
