export const Server = {
  endpoint: process.env.API_ENDPOINT!,
  project: process.env.APP_PROJECT!,
  database: process.env.DATABASE_ID!,
};

export enum MyCollections {
  Sports = "636f120814bc273d82db",
  Users = "636f27df6af7980e574e",
}
