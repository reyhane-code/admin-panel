import { IGetFileQuery } from "../../interfaces";
import { useObjToQueryString } from "../../hooks/useObjToQueryString";
import { useState, useEffect } from "react";

interface Props {
  altText?: string;
  className?: string;
  query?: IGetFileQuery;
  src?: string;
  defaultSrc?: string;
}

function Image({
  query,
  altText = "",
  className = "",
  src,
  defaultSrc = "/default.svg",
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  let source: string | undefined;
  if (query) {
    const queryString = useObjToQueryString(query);
    source = `http://127.0.0.1:3500/api/v1/files?${queryString}`;
  } else {
    source = imgSrc;
  }

  const handleError = () => {
    setImgSrc(defaultSrc);
  };

  useEffect(() => {
    if (query) {
      const queryString = useObjToQueryString(query);
      setImgSrc(`http://127.0.0.1:3500/api/v1/files?${queryString}`);
    } else {
      setImgSrc(src);
    }
  }, [query, src]);

  return (
    <img
      src={imgSrc}
      alt={altText}
      className={className}
      onError={handleError} // Attach the error handler
    />
  );
}

export default Image;
