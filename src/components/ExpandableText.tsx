import Button from "./common/Button";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode; // Change from string to ReactNode
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  // Convert children to string if it's a single text node
  const textContent = typeof children === 'string' ? children : '';
  
  if (textContent.length <= limit) return <p>{textContent}</p>;

  const summary = expanded ? textContent : textContent.substring(0, limit) + "...";

  return (
    <p className="text-lg">
      {summary}
      <Button
        size="xs"
        color="yellow-400"
        className="ml-1 font-bold"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </p>
  );
};

export default ExpandableText;
