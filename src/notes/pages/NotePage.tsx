import React from "react";
import { useParams } from "react-router-dom";

export const NotePage: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  return <div>{`Note con id: ${id}`}</div>;
};
