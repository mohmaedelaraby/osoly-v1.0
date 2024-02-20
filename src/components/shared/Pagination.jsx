import { Button } from "@chakra-ui/react";
import { usePagination } from "../../customHooks/usePagination";
import { Pagination_Types } from "../../enums/PaginationEnum";

/* type PaginationProps = {
    totalCount: number,
    currentPage: number,
    pageSize: number,
    onPageChange: (page: number) => void
} */

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  type = Pagination_Types.Pagination,
}) => {
  const range = usePagination(totalCount, pageSize);
  const lastPage = range[range.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <>
      {type === Pagination_Types.Pagination ? (
        <>
          <div className="pagination">
            <Button
              className="pagination_prev"
              variant="outline"
              onClick={onPrevious}
              isDisabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <path
                  d="M7.84667 1.51398L6.66667 0.333984L0 7.00065L6.66667 13.6673L7.84667 12.4873L2.36 7.00065L7.84667 1.51398Z"
                  fill="#15161E"
                />
              </svg>
              perv
            </Button>

            <Button
              className="pagination_next"
              variant="outline"
              onClick={onNext}
              isDisabled={currentPage === lastPage}
            >
              next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4.15332 13.4873L5.33332 14.6673L12 8.00065L5.33332 1.33398L4.15332 2.51398L9.63999 8.00065L4.15332 13.4873Z"
                  fill="#15161E"
                />
              </svg>
            </Button>
          </div>
        </>
      ) : (
        <>
        <div className="pagination">
            <Button
              className="pagination_next"
              variant="outline"
              onClick={onNext}
              isDisabled={currentPage === lastPage}
            >
              Load More
            </Button>
          </div></>
      )}
    </>
  );
};

export default Pagination;
