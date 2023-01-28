import React from 'react';
import elecguit from '../icons/elecguitar.png';
import elecbass from '../icons/elecbass.png';

import '../css/plotlayout.css';

const iconMap = {
	'elecguit': elecguit,
	'elecbass': elecbass
}

const Pallette = () => {
	const handleDragStart = (e) => {
		e.dataTransfer.setData('icon', e.target.id);
	};
	return (
		<div className='icons'>
				<img id='elecguit' className='icon' src={ elecguit } alt='electric guitar' draggable='true' onDragStart={handleDragStart} />
				<img id='elecbass' className='icon' src={ elecbass } alt='electric bass' draggable='true' onDragStart={handleDragStart} />
		</div>
	)
};

const PlotLayout = ({ stagePlot, handleLayout }) => {
	const [stage, setStage] = React.useState({});
	const stageRef = React.useRef();
	React.useEffect(() => {
		if (!stageRef.current) return;
		const width = stageRef.current.getBoundingClientRect().width;
		const height = stageRef.current.getBoundingClientRect().height;
		const left = stageRef.current.getBoundingClientRect().x;
		const top = stageRef.current.getBoundingClientRect().y;
		setStage({ width, height, left, top });
	}, [stageRef]);
	
	const handleDragStart = (e) => {
		e.dataTransfer.setData('icon', e.target.id);
		e.dataTransfer.setData('data-position', e.target.getAttribute('data-position'));
	};
	
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const iconWidth = 50;
		const iconHeight = 50;
		const name = e.dataTransfer.getData('icon');
		const currentPosition = e.dataTransfer.getData('data-position');
		const position = [
			Math.round(e.pageX - stage.left - (iconWidth/2)),
			Math.round(e.pageY - stage.top - (iconHeight/2))
		];
		// move or append icon to stagePlot.icons
		if (stagePlot.icons || currentPosition) {
			const icons = stagePlot.icons.filter((icon) => {
				return icon.position.toString() !== currentPosition
			})
			handleLayout([...icons, { name, position }]);
		} else {
			const icons = [...stagePlot.icons || [], { name, position }];
			handleLayout(icons);
		}
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	
	// TODO handle moving existing
	const renderIcons = () => {
		if (!stagePlot.icons) return;
		return stagePlot.icons.map((icon, i) => {
			const left = icon.position[0] + stage.left;
			const top = icon.position[1] + stage.top;
			return (
				<img
					key={`${i}`}
					data-position={icon.position}
					id={icon.name}
					className='iconAbsolute'
					src={ iconMap[icon.name] }
					alt={icon.name}
					draggable='true'
					style={{
						top: `${top}px`,
						left: `${left}px`
					}}
					onDragStart={handleDragStart}
				/>
			)
		});
	};
	
	return (
		<div>
			<div className='stage' ref={stageRef} onDrop={handleDrop} onDragOver={handleDragOver}></div>
			{ renderIcons() }
      <Pallette />
    </div>
	);
};

export default PlotLayout;