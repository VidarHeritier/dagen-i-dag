import React from "react";

interface SkeletonProps {
  content: React.ReactNode;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ content }) => {
  return (
    <div className="mx-28 bg-red-400 px-8 py-12 rounded-md border-red-600 ">
      {content}
    </div>
  );
};

export default Skeleton;
