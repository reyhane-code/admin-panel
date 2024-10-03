import { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

interface IProps {
  children?: ReactNode;
  label?: string | number;
  value?: string | number;
  onChange?: (value: string) => void;
  onClick?: () => void;
  name: string;
  className?: string;
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

function RadioInput({
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
}: IProps) {
  const { control, register } = useFormContext() || { control: null }; // Provide a fallback

  if (!value) value = "";

  if (!control || !register) {
    return (
      <div className="">
        <label className="text-sm mx-1">
          {label}
        </label>
        <div className="">
          {leftSlot}
          <input
            type='radio'
            className={`radio w-2 ${className}`}
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
    <div className="">
      <label className="input input-bordered flex flex-col items-center w-full">
        <span className="text-sm mx-1">{label}</span>
        <input
          type='radio'
          className="radio"
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
      <div className="">
        {error && (
          <span className="text-red-500 text-xs lg:text-sm ms-auto me-1 w-max">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default RadioInput;
