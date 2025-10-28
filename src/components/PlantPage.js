import React, { useState, useEffect } from "react";
import axios from "axios";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:6001/plants");
      const plantsWithStock = response.data.map(plant => ({ ...plant, soldOut: false }));
      setPlants(plantsWithStock);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const handleAddPlant = async (newPlant) => {
    try {
      const response = await axios.post("http://localhost:6001/plants", newPlant);
      setPlants([...plants, { ...response.data, soldOut: false }]);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleToggleSoldOut = (id) => {
    setPlants(plants.map(plant =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  const handleUpdatePlant = async (id, updatedPlant) => {
    try {
      const response = await axios.patch(`http://localhost:6001/plants/${id}`, updatedPlant);
      setPlants(plants.map(plant =>
        plant.id === id ? { ...plant, ...response.data } : plant
      ));
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  const handleDeletePlant = async (id) => {
    try {
      await axios.delete(`http://localhost:6001/plants/${id}`);
      setPlants(plants.filter(plant => plant.id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={plants} searchTerm={searchTerm} onToggleSoldOut={handleToggleSoldOut} onUpdatePlant={handleUpdatePlant} onDeletePlant={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
