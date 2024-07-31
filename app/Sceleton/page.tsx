import React from "react";

interface SkeletonProps {
  content: React.ReactNode;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ content }) => {
  return (
    <div className=" ml-32 w-5/6 bg-red-400 px-8 py-12 rounded-md ">
      {content}
    </div>
  );
};

export default Skeleton;
