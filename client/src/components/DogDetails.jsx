import React from "react";
import { useSelector } from "react-redux";

import RenderDogDetails from "./RenderDogDetails";

const DogDetails = () => {
  const dog = useSelector((state) => state.dogById);

  if (dog.length < 1) {
    return <div>cargando</div>;
  }

  return (
    <div>
      <RenderDogDetails dog={dog} />
    </div>
  );
};

export default DogDetails;
