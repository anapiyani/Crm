import { FC } from "react";
import "./CustomPagination.scss";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showBorders?: boolean;
};

const CustomPagination: FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showBorders = true,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= Math.max(endPage, 1); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-item ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={`custom-pagination ${showBorders ? "with-borders" : ""}`}>
      <button
        className="pagination-item"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft
          sx={{
            fontSize: 20,
            display: "flex",
          }}
        />
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-item"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight
          sx={{
            fontSize: 20,
            display: "flex",
          }}
        />
      </button>
    </div>
  );
};

export default CustomPagination;
