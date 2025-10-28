import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePlant, onDeletePlant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(plant.price);
  const handleSavePrice = () => {
    onUpdatePlant(plant.id, { price: parseFloat(editPrice) });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditPrice(plant.price);
    setIsEditing(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {isEditing ? (
        <input
          type="number"
          step="0.01"
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
        />
      ) : (
        plant.price
      )}</p>
      {isEditing ? (
        <>
          <button onClick={handleSavePrice}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit Price</button>
          <button onClick={() => onDeletePlant(plant.id)}>Delete</button>
        </>
      )}
      {plant.soldOut ? (
        <button onClick={() => onToggleSoldOut(plant.id)}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={() => onToggleSoldOut(plant.id)}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
