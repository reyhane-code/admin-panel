import { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  children?: ReactNode;
  placeholder: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onClick?: () => void;
  name: string;
  className?: string;
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

function TextArea({
  placeholder,
  name,
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
        <div className="px-4 border border-gray-300 rounded-md flex items-center w-full min-h-10">
          {leftSlot}
          <textarea
            className={`grow focus:!outline-none active:!outline-none textarea textarea-bordered ${className}`}
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
      <textarea
        className="grow w-full textarea textarea-bordered"
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

export default TextArea;
