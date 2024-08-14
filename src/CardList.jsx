import React from 'react';
import { Link } from 'react-router-dom';

function CardList({ cards }) {
  return (
    <div>
      {cards.map(card => (
        <div key={card.id}>
          <h2>{card.description}</h2>
          <img src={card.imageUrl} alt={card.description} />
          <p>Price: ${card.price}</p>
          <Link 
            to={{
              pathname: `/card-details/${card.id}`,
              state: { card } // Pass the entire card object in the state
            }}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CardList;
