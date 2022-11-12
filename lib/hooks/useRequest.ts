import { useEffect, useState } from "react";

export type ReqData<T> = {
  result: T | undefined;
  error: Error | undefined;
  loading: boolean;
};

const useRequest = <T>(val: () => Promise<T> | undefined): ReqData<T> => {
  const [result, setResult] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = () => {
      if (val === undefined) {
        return;
      } else {
        val()
          ?.then((result) => {
            setResult(result);
          })
          ?.catch((err) => {
            setError(err);
          })
          ?.finally(() => setLoading(false));
      }
    };
    get();
  }, [val]);

  return { result: result, error, loading };
};

export default useRequest;
