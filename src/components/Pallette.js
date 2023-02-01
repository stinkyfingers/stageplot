import React from 'react';
import elecguit from '../icons/elecguitar.png';
import elecbass from '../icons/elecbass.png';



const Pallette = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('icon', e.target.id);
  };
  return (
    <div className='pallette'>
      <img id='elecguit' className='icon' src={ elecguit } alt='electric guitar' draggable='true' onDragStart={handleDragStart} />
      <img id='elecbass' className='icon' src={ elecbass } alt='electric bass' draggable='true' onDragStart={handleDragStart} />
    </div>
  )
};

export default Pallette;