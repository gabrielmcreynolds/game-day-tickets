import { Models } from "appwrite";
import Bball from "../../public/bball.svg";
import Fball from "../../public/fball.svg";
import { StaticImageData } from "next/image";

type Sport = Models.Document & {
  name: string;
};

export const getSportIcon = (sport: Sport): StaticImageData => {
  if (sport.name === "Basketball") {
    return Bball;
  } else if (sport.name === "Football") {
    return Fball;
  } else {
    return Bball;
  }
};

export default Sport;
