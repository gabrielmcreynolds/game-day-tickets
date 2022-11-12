type MyError = {
  message: string;
  code?: number;
};

export const isError = (
  toBeDetermined: any | MyError
): toBeDetermined is MyError => {
  return !!(toBeDetermined as MyError)?.message;
};

export default MyError;
