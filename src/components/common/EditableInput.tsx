import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { useController, useFormContext } from "react-hook-form";

interface EditableInputProps {
  name: string; // Added name prop for react-hook-form
  label: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void; // Add onChange prop
  value?: string; // Add value prop
}

const EditableInput: React.FC<EditableInputProps> = ({
  name,
  label,
  disabled,
  className,
  onChange,
  value,
}) => {
  const { control } = useFormContext(); // Access form context
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: value || '', // Set default value if provided
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value); // Update react-hook-form state
    if (onChange) {
      onChange(event.target.value); // Call custom onChange if provided
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    field.onBlur(); // Trigger blur event for validation
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-lg font-medium mb-1 mx-1">{label}:</label>
      {disabled ? (
        <div className="px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200">
          <span>{field.value ?? ''}</span>
        </div>
      ) : isEditing ? (
        <input
          type="text"
          value={value !== undefined ? value : field.value ?? ''} // Use value prop if provided
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className={`${className} px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          disabled={disabled}
        />
      ) : (
        <span
          className="px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleInputClick}
        >
          <span>{field.value !== undefined ? field.value : 'No value set'}</span> {/* Check for value */}
          <FaPen className="text-gray-500 hover:text-blue-500 transition duration-200" />
        </span>
      )}
      <div className="w-full mt-1 flex min-h-4">
        {error && (
          <span className="text-red-500 text-xs lg:text-sm ms-auto me-1 w-max">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default EditableInput;
