import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <div className="flex-center flex-col !items-start my-5">
      <dt className="text-lg text-base-content mb-2">{term}: </dt>
      <dd>{children}</dd>
    </div>
  );
};

export default DefinitionItem;
