import usePagination, { PaginationApi } from "../lib/hooks/usePagination";

const Pagination = <T extends unknown>({
  getData,
  itemBuilder,
  filter,
}: {
  filter?: (item: T) => boolean;
  getData: (page: number) => Promise<PaginationApi<T>>;
  itemBuilder: (item: T) => JSX.Element;
}) => {
  const { isLoading, currentPage, pageData, maxPage, next, prev } =
    usePagination<T>(getData);
  const canAdvance = currentPage < maxPage;
  const canPrev = currentPage !== 1;

  return (
    <>
      {isLoading || !pageData ? (
        <p>Loading</p>
      ) : (
        pageData.map((item) =>
          filter && !filter(item) ? <></> : itemBuilder(item)
        )
      )}

      <div className="flex flex-row justify-end mt-2">
        <button
          disabled={!canPrev}
          className="border px-2 font-bold text-primary mx-2"
          onClick={prev}
        >
          &#60;
        </button>
        <p className="text-secondary">{currentPage}</p>
        <button
          disabled={!canAdvance}
          className="border px-2 font-bold text-primary mx-2"
          onClick={next}
        >
          {" "}
          &#62;
        </button>
      </div>
    </>
  );
};

export default Pagination;
