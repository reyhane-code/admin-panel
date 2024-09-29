interface Props {
  selectText: string;
  itemsList: any[];
  showField: string;
  onValueChange: (value: any) => void;
  className?: string;
}

const Select: React.FC<Props> = ({
  className,
  selectText,
  itemsList,
  showField,
  onValueChange,
}) => {
  return (
    <select
      onChange={(e) => onValueChange(e.target.value)}
      className={`select w-full max-w-xs ${className}`}
      value={selectText}
    >
      <option disabled value="">
        {selectText}
      </option>
      {itemsList.map((item, index) => (
        <option key={index} value={item[showField]}>
          {item[showField]}
        </option>
      ))}
    </select>
  );
};

export default Select;
