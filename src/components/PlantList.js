import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, searchTerm, onToggleSoldOut }) {
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="cards">
      {filteredPlants.map(plant => (
        <PlantCard key={plant.id} plant={plant} onToggleSoldOut={onToggleSoldOut} />
      ))}
    </ul>
  );
}

export default PlantList;
