import React from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};
export default layout;
