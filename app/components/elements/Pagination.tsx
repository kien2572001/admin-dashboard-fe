import React, { useEffect, useState } from "react";

interface PaginationProps {
  prev: () => void;
  currentPage: number;
  next: () => void;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  prev,
  currentPage,
  next,
  totalPages,
  handlePageChange,
}) => {
  const [pageArray, setPageArray] = useState<number[]>([]);

  // useEffect(() => {
  //   const totalPages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     totalPages.push(i);
  //   }
  //   setPageArray(totalPages);
  // }, [totalPages]);

  const getPaginationGroup = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, 5);
    }

    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }

    const pagesToShow = [];

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (startPage > 1) {
      pagesToShow.unshift("...");
      pagesToShow.unshift(1);
    }

    if (endPage < totalPages) {
      pagesToShow.push("...");
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const paginationGroup = getPaginationGroup();

  return (
    <>
      <div className="pagination-area mt-30 mb-10 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-start">
            {paginationGroup.length <= 0 ? null : (
              <li className="page-item">
                <button className="page-link" onClick={prev}>
                  <i className="material-icons md-chevron_left"></i>
                </button>
              </li>
            )}
            {paginationGroup.map((page, index) => (
              <li
                key={"pagination-" + index}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (page === "...") return;
                    handlePageChange(Number.parseInt(page.toString()));
                  }}
                >
                  {page}
                </button>
              </li>
            ))}
            {paginationGroup.length <= 0 ? null : (
              <li className="page-item">
                <button className="page-link" onClick={next}>
                  <i className="material-icons md-chevron_right"></i>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
