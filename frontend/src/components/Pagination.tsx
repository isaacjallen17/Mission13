interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={currentPage === i}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === pageSize - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Number Of Books Per Page:
        <select
          value={pageSize}
          onChange={(x) => {
            onPageSizeChange(Number(x.target.value));
            onPageChange(0);
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
