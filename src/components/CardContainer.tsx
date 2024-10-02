import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const CardContainer = ({ children }: IProps) => {
  return (
    // TODO: improve the scale
    <div className="rounded-box w-full overflow-hidden">{children}</div>
  );
};

export default CardContainer;
