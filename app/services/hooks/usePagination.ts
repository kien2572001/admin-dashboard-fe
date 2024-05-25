import { useState } from "react";

interface UsePaginationResult {
  page: number;
  limit: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setPageNumber: (pageNumber: number) => void;
  setLimitPerPage: (newLimit: number) => void;
  setTotalPages: (total: number) => void;
}

const usePagination = (
  initialPage: number = 1,
  initialLimit: number = 10
): UsePaginationResult => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [totalPages, setTotalPages] = useState<number>(1);

  const goToNextPage = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  const setPageNumber = (pageNumber: number) =>
    setPage(Math.max(Math.min(pageNumber, totalPages), 1));
  const setLimitPerPage = (newLimit: number) => setLimit(newLimit);
  const setTotal = (total: number) => setTotalPages(Math.max(total, 1));

  return {
    page,
    limit,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    setPageNumber,
    setLimitPerPage,
    setTotalPages: setTotal,
  };
};

export default usePagination;
