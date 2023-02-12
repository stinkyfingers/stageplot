import React from 'react';
import iconMap from '../lib/Icons'

const Pallette = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('icon', e.target.id);
  };
  return (
    <div className='pallette'>
      { Object.keys(iconMap).map((key) => (
        <img
          id={key}
          key={key}
          className='icon'
          style={{ height: iconMap[key].height, width: 'auto'}}
          src={ iconMap[key].img }
          alt={key} draggable='true'
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  )
};

export default Pallette;