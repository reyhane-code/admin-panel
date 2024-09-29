import { useState, useEffect } from "react";
import TextInput from "./common/TextInput";
import { CiSearch } from "react-icons/ci";
import useSearch from "../hooks/useSearch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { FilterOperationEnum } from "../enums";
import OutsideClickHandler from "react-outside-click-handler";
import * as qs from "qs";
import { MdClose } from "react-icons/md";
import CardSkeleton from "./CardSkeleton";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useSearch(searchTerm);
  const navigate = useNavigate();
  const location = useLocation();
  const { generateRouteQuery } = useApi<any, Error>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = qs.parse(params.toString()) as any;
    if (query?.["search"]?.[0]) {
      const searchValue = query?.["search"]?.[0]?.value
        .toString()
        .replaceAll("%", "");
      setSearchTerm(searchValue);
    }
  }, [location.search]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setIsModalOpen(true);
  };
  const handleInputClick = () => {
    if (searchTerm?.length) {
      setIsModalOpen(true);
    }
  };

  const handleShowAll = (page: string) => {
    setIsModalOpen(false); // Close modal when showing all
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    if (page === "games") {
      const query = generateRouteQuery(
        {
          field: "name",
          operation: FilterOperationEnum.ILIKE,
          value: `%${encodedSearchTerm}%`,
        },
        "search"
      );
      navigate(`/${query}`);
    } else if (page === "articles") {
      const query = generateRouteQuery(
        {
          field: "title",
          operation: FilterOperationEnum.ILIKE,
          value: `%${encodedSearchTerm}%`,
        },
        "search"
      );
      navigate(`/articles${query}`);
    }
  };

  const onClearClick = () => {
    setSearchTerm("");
    setIsModalOpen(false);
    const path = location.pathname;
    if (path.includes("/articles")) {
      navigate("/articles");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <TextInput
          className="w-full"
          type="text"
          placeholder="Search..."
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputClick}
          rightSlot={
            !searchTerm.length ? (
              <CiSearch className="text-sm lg:text-2xl text-gray-400" />
            ) : (
              <MdClose
                className="text-sm lg:text-2xl text-gray-400 transition-colors duration-200 hover:text-gray-800 cursor-pointer"
                onClick={onClearClick}
              />
            )
          }
        />
      </form>

      {isModalOpen && searchTerm != "" && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="fixed top-14 left-[-3rem] sm:inset-x-0 min-w-[90vw] sm:min-w-[auto] flex flex-col divide-y divide-slate-400 gap-y-5 bg-white rounded-xl min-h-24 px-4 pb-2 shadow-md">
            {isLoading && <CardSkeleton />}
            {error && <p>Error loading search results: {error.message}</p>}
            {!data?.items.articles?.length &&
            !data?.items.games?.length &&
            !isLoading ? (
              <p>No results were found!</p>
            ) : (
              <>
                {data?.items.games?.length > 0 && (
                  <div className="flex flex-col w-full pt-2">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-base font-bold">Games</h3>
                      <div
                        onClick={() => handleShowAll("games")}
                        className="text-sm font-medium text-blue-500 hover:text-blue-800 cursor-pointer"
                      >
                        Show All
                      </div>
                    </div>

                    <ul className="flex flex-col w-full bg-base-100 rounded-box z-[1] divide-y divide-slate-200 pt-2 gap-y-1">
                      {data.items.games.slice(0, 3).map((game: any) => (
                        <li key={game.id}>
                          <Link
                            className="text-base hover:text-blue-500"
                            to={`/games/${game.slug}`}
                          >
                            {game.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data?.items.articles?.length > 0 && (
                  <div className="flex flex-col w-full pt-2">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-base font-bold">Articles</h3>
                      <div
                        onClick={() => handleShowAll("articles")}
                        className="text-sm font-medium text-blue-500 hover:text-blue-800 cursor-pointer"
                      >
                        Show All
                      </div>
                    </div>
                    <ul className="flex flex-col w-full bg-base-100 rounded-box z-[1] divide-y divide-slate-200 pt-2 gap-y-1">
                      {data.items.articles.slice(0, 3).map((article: any) => (
                        <li key={article.id}>
                          <Link
                            className="text-base hover:text-blue-500"
                            to={`/articles/${article.id}`}
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default SearchInput;
