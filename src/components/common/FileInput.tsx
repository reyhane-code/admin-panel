import { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

interface IProps {
  label?: string;
  name: string;
  className?: string;
  children?: ReactNode;
  onChange?: (image: FileList | null) => void; // Custom onChange prop
}

function FileInput({ name, label, className, children, onChange }: IProps) {
  const { control } = useFormContext(); // Get control from form context

  // Use useController to get field and error state
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null, // Default value for file input
  });

  return (
    <div className="flex flex-col w-full h-max">
      {label && <label className="text-sm mx-1">{label}</label>}
      <input
        type="file"
        className={`file-input file-input-bordered w-full ${className}`}
        {...field}
        name={name}
        onChange={(e) => {
          field.onChange(e); // Call react-hook-form's onChange
          if (onChange) {
            onChange(e.target.files); // Call custom onChange if provided
          }
        }}
      />
      {children}
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default FileInput;
