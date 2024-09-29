import { ImageFormat } from "../enums";
import Image from "./common/Image";

interface Props {
  screenshots: [
    {
      id: number;
      hash_key: string;
      createdAt: Date;
      updatedAt: Date | null;
      deletedAt: Date | null;
    }
  ];
}
const GameScreenshots = ({ screenshots }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {screenshots?.map((item) => (
        <Image query={{ hashKey: item.hash_key, format: ImageFormat.WEBP }} />
      ))}
    </div>
  );
};

export default GameScreenshots;
