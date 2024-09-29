import { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  children?: ReactNode;
  type: string;
  placeholder: string;
  label?: string | number;
  value?: string | number;
  onChange?: (value: string) => void;
  onClick?: () => void;
  name: string;
  className?: string;
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

function TextInput({
  type,
  placeholder,
  name,
  label,
  children,
  value,
  onChange,
  onClick,
  leftSlot,
  rightSlot,
  className,
  ...rest
}: Props) {
  const { control, register } = useFormContext() || { control: null }; // Provide a fallback

  if (!value) value = "";

  if (!control || !register) {
    return (
      <div className="flex flex-col w-full h-max">
        <label className="text-sm mx-1">
          {label}
        </label>
        <div className="px-4 border border-gray-300 rounded-md flex items-center w-full min-h-10">
          {leftSlot}
          <input
            type={type}
            className={`grow focus:!outline-none active:!outline-none ${className}`} 
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value); // Call custom onChange if provided
              }
            }}
            onClick={onClick}
            {...rest}
          />
          {rightSlot}
        </div>
      </div>
    );
  }

  // Use useController to get field and error state
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: value,
  });

  return (
    <div className="flex flex-col w-full h-max grow">
      <label className="input input-bordered flex flex-col items-center w-full">
        <span className="text-sm mx-1">{label}</span>
        <input
          type={type}
          className="grow w-full"
          placeholder={placeholder}
          {...field}
          onChange={(e) => {
            field.onChange(e); // Call react-hook-form's onChange
            if (onChange) {
              onChange(e.target.value); // Call custom onChange if provided
            }
          }}
        />
        {children}
      </label>
      <div className="w-full mt-1 flex min-h-4">
        {error && (
          <span className="text-red-500 text-xs lg:text-sm ms-auto me-1 w-max">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
