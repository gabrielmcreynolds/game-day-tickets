export const Server = {
  endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
  project: process.env.NEXT_PUBLIC_APP_PROJECT!,
  database: process.env.NEXT_PUBLIC_DATABASE_ID!,
};

export enum MyCollections {
  Sports = "636f120814bc273d82db",
  Users = "636f27df6af7980e574e",
  Events = "636fcbf3c1fbf01f919b",
}
