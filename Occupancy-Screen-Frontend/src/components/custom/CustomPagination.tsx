import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const goToPreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const goToNextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={goToPreviousPage} />
        </PaginationItem>
        {[...Array(totalPages).keys()]?.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={currentPage === pageNumber + 1}
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={goToNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
