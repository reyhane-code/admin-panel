import { useState } from "react";
import useApi from "../hooks/useApi";
import { IGetGamesResponse } from "../responses/get-games.response"; // Assuming you have this response type defined

interface Props {
  sortbyOptions: Sortby[];
}

interface Sortby {
  value: string;
  label: string;
}

const SortSelector = ({ sortbyOptions }: Props) => {
  const { setSortBy } = useApi<IGetGamesResponse, Error>(''); // Assuming you have a suitable endpoint
  const [selectedValue, setSelectedValue] = useState("Sort");

  // Add "All Sorts" option to the sortbyOptions
  const optionsWithAllSorts = [
    { value: "", label: "All Sorts" }, // Default option for "All Sorts"
    ...sortbyOptions,
  ];

  const handleSortChange = (item: Sortby) => {
    // Update selected sort value
    setSelectedValue(item.label);

    // Replace the sort filter in the API
    if (item.value) {
      setSortBy(item.value);
    } else {
      setSortBy("")
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
        {selectedValue}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        {optionsWithAllSorts.map((item, index) => (
          <li
            className="cursor-pointer h-10"
            key={index}
            onClick={() => handleSortChange(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortSelector;
