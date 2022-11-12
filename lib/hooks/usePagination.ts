import { useEffect, useState } from "react";
import { PAGINATION_SIZE } from "../utils/config";

export type PaginationApi<T> = {
  size: number;
  data: T[];
};

const usePagination = <T>(
  getData: (page: number) => Promise<PaginationApi<T>>
): {
  isLoading: boolean;
  currentPage: number;
  pageData: T[] | undefined;
  maxPage: number;
  next: () => void;
  prev: () => void;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPageData, setAllPageData] = useState<T[][]>([]);
  const [pageData, setPageData] = useState<undefined | T[]>(undefined);
  const [maxPage, setMaxPage] = useState(0);
  const [highestFetchedPage, setHighestFetchedPage] = useState(0);

  const fetchData = async (p: number) => {
    setIsLoading(true);
    const data = await getData(p);
    setMaxPage(Math.ceil(data.size / PAGINATION_SIZE));
    setAllPageData([...allPageData, data.data]);
    setPageData(data.data);
    setHighestFetchedPage(highestFetchedPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const next = async () => {
    if (currentPage < highestFetchedPage) {
      setPageData(allPageData[currentPage]);
      setCurrentPage(currentPage + 1);
    } else if (currentPage < maxPage) {
      await fetchData(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageData(allPageData[allPageData.length - 2]);
    }
  };

  return { isLoading, currentPage, pageData, maxPage, next, prev };
};

export default usePagination;
