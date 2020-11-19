import { useEffect, useRef } from "react";
type BlockType = {
  _id: string;
  html: string;
  tag: string;
  imageUrl: string;
};
const usePrevious = (value: any) => {
  const ref: React.MutableRefObject<BlockType[] | undefined> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
