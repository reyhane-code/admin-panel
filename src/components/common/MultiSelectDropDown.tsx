import { useEffect, useRef, useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface IProps {
  formFieldName: string;
  options: Option[];
  onChange: (selectedOptions: number[]) => void;
}

const MultiSelectDropdown = ({ formFieldName, options, onChange }: IProps) => {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const optionsListRef = useRef<HTMLUListElement | null>(null);

  const isSelectAllEnabled = selectedOptions?.length < options?.length;
  const isClearSelectionEnabled = selectedOptions?.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const optionId = Number(e.target.value); // Convert value to number

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(optionId);
    } else {
      selectedOptionSet.delete(optionId);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const handleSelectAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const allOptionIds = options?.map(option => option.id);
    setSelectedOptions(allOptionIds);
    onChange(allOptionIds);
  };

  const handleClearSelectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
        {"Show the dropdown"}
      </div>

      <div className="absolute bg-white z-10 border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
        <ul ref={optionsListRef}>
          <li>
            <button
              onClick={handleSelectAllClick}
              disabled={!isSelectAllEnabled}
              className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
            >
              {"Select All"}
            </button>
          </li>
          <li>
            <button
              onClick={handleClearSelectionClick}
              disabled={!isClearSelectionEnabled}
              className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
            >
              {"Clear selection"}
            </button>
          </li>
          {options?.map((option) => (
            <li key={option.id}>
              <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={formFieldName}
                  value={option.id} // value remains a number
                  className="cursor-pointer"
                  onChange={handleChange}
                  checked={selectedOptions.includes(option.id)}
                />
                <span className="ml-1">{option.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
}

export default MultiSelectDropdown;
