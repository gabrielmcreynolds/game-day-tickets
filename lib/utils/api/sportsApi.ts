import Sport from "../../types/sport";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";

export const getSports = async (): Promise<{
  sports: Sport[];
  total: number;
}> => {
  const sports = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Sports);
  return {
    sports: sports.documents.map((e) => e as Sport),
    total: sports.total,
  };
};
