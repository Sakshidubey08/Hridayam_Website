import React, { useState } from 'react';

const HeartButton = ({ cardId, handleFavoriteClick }) => {
  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed(!isRed);
    handleFavoriteClick(cardId);
  };

  return (
    <button className="favorite-btn" onClick={handleClick} style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
      <i className={`fa-heart ${isRed ? 'fas' : 'far'}`} style={{ color: isRed ? 'red' : 'black', fontSize: '24px' }}></i> ❤️
    </button>
  );
};

export default HeartButton;
