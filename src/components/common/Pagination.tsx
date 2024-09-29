import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface Props {
  perPage: number;
  count: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination = ({ perPage, count, page, setPage }: Props) => {
  const totalPages = Math.ceil(count / perPage);
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the page state in the parent component
    navigate(`?page=${newPage}&perPage=${perPage}`); // Update the URL with the new page and current perPage
  };

  return (
    <div className="flex justify-between items-center">
      <Button
        color="primary"
        disabled={Number(page) === 1}
        onClick={() => handlePageChange(Number(page) - 1)}
        className="mx-5"
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        color="primary"
        disabled={Number(page) === totalPages}
        onClick={() => handlePageChange(Number(page) + 1)}
        className="mx-5"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
