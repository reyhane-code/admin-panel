interface IProps {
  text: string;
  onchange: () => void;
}

function ToggleSwitch({ text, onchange }: IProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{text}</span>
        <input type="checkbox" className="toggle" checked onChange={onchange} />
      </label>
    </div>
  );
}

export default ToggleSwitch;
