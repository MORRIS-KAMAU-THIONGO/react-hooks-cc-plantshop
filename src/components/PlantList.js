import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, searchTerm, onToggleSoldOut, onUpdatePlant, onDeletePlant }) {
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="cards">
      {filteredPlants.map(plant => (
        <PlantCard key={plant.id} plant={plant} onToggleSoldOut={onToggleSoldOut} onUpdatePlant={onUpdatePlant} onDeletePlant={onDeletePlant} />
      ))}
    </ul>
  );
}

export default PlantList;
