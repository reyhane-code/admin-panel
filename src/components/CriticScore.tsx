interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <div className={`bg-${color}-500 px-2 rounded-lg text-sm`}>{score}</div>
  );
};

export default CriticScore;
