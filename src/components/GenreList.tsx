import { useState } from "react";
import useGenres from "../hooks/useGenres";
import Genre from "../entities/Genre";
import { FilterOperationEnum } from "../enums";
import { IGetGamesResponse } from "../responses/get-games.response";
import useApi from "../hooks/useApi";


const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const [selectedGenreName, setSelectedGenreName] = useState("All Genres");
  const { replaceItemByField, removeItemsByField } = useApi<IGetGamesResponse, Error>('');

  if (error) return null;
  if (isLoading) return <span className="loading loading-ring loading-lg">Loading</span>;


  const genresWithDefaultOption = [
    { id: -1, name: "All Genres", created_at: new Date() },
    ...data,
  ];

  const handleGenreChange = (genre: Genre) => {
    const isAllGenres = genre.id === -1;

    // Remove existing genre filters
    removeItemsByField('genre.id', 'filter');

    // Update selected genre name
    setSelectedGenreName(genre.name);

    // If the selected genre is not "All genres", add the new filter
    if (!isAllGenres) {
      const newItem = {
        field: "genre.id",
        operation: FilterOperationEnum.EQ,
        value: genre.id,
      };
      replaceItemByField('genre.id', newItem, 'filter');
    }

    // Blur the active element
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };


  return (
    <div className="dropdown z-10">
      <label tabIndex={0} className="btn m-1">
        {selectedGenreName}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        {genresWithDefaultOption?.map((genre: Genre) => (
          <li key={genre.id} className="cursor-pointer h-10" onClick={() => handleGenreChange(genre)}>
            <span
            >
              {genre.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
