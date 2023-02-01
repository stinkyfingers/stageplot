import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';

import '../css/monitor_list.css';

const MonitorList = ({ stagePlot, handleMonitorList }) => {
	const [inputErr, setInputErr] = React.useState();
	const newChannel = !stagePlot.monitorList ? 1 : stagePlot.monitorList[stagePlot.monitorList.length - 1].channel + 1;
	const handleAddRow = () => {
		if (!stagePlot.monitorList) {
			handleMonitorList([{ name: '', channel: newChannel, monitorLevels: [] }]);
			return;
		}
		stagePlot.monitorList.push({ name: '', channel: newChannel, monitorLevels: []  });
		handleMonitorList(stagePlot.monitorList)
	};
	const handleChange = (e) => {
		setInputErr(null);
		const index = parseInt(e.target.getAttribute('data-index'), 10);
		const value = e.target.name === 'channel' ? parseInt(e.target.value, 10) : e.target.value;
		if (!value) {
			setInputErr('value is required');
			return
		}
		stagePlot.monitorList[index][e.target.name] = value;
		handleMonitorList(stagePlot.monitorList);
	};

	const handleRemove = (index) => {
		stagePlot.monitorList.splice(index, 1)
		handleMonitorList(stagePlot.monitorList);
	};
	
	const handleMonitorLevel = (e, monitorLevel, monitorIndex, levelIndex) => {
		const value = parseInt(e.target.value, 10);
		if (value.isNan()) return;
		stagePlot.monitorList[monitorIndex].monitorLevels[levelIndex] = { inputChannel: monitorLevel.inputChannel, level: value};
		handleMonitorList(stagePlot.monitorList);
	};

	const renderMonitors = () => {
		if (!stagePlot.monitorList) return null;
		return (
			stagePlot.monitorList.map((monitor, i) => (
				<tr key={`${monitor.channel}-${i}`} className='monitorLevels'>
					<td>
						<input className='channel' type='number' min='0' max='128' onChange={handleChange} name='channel' data-index={i} value={monitor.channel} />
					</td>
					<td>
						<input className='name' type='text' placeholder='Name' onChange={handleChange} name='name' data-index={i} value={monitor.name} />
					</td>
					{ stagePlot.inputList.map((input, j) => {
						const monitorLevels = monitor.monitorLevels || [];
						const monitorLevel = monitorLevels.find((level) => level.inputChannel === input.channel) || ({ inputChannel: input.channel, level: 0 });
						return (
							<td key={`${input.name}-${j}`}>
								<input className='channel' type={'number'} min='0' max='100' step='5' value={monitorLevel.level} onChange={(e) => handleMonitorLevel(e, monitorLevel, i, j)} />
							</td>
						)
					})}
					<td>
						<FontAwesomeIcon className='delete' icon={faRemove} onClick={() => handleRemove(i)} />
					</td>
				</tr>
			))
		)
	};

	return (
		<div className='monitorList'>
			{ inputErr && <div className='error'>{inputErr}</div> }
			<h3>Monitors</h3>
			<table>
				<thead>
				<tr className='topHeader'>
					<th colSpan='2'></th>
					<th colSpan={stagePlot.inputList.length}>
						Recommended Monitor Levels (0-100%)
					</th>
				</tr>
				<tr>
					<th>Channel</th>
					<th>Name</th>
					{ stagePlot.inputList.map((input, i) => (
						<th key={`${input.name}-${i}`}>{input.name}</th>
					))}
				</tr>
				</thead>
				<tbody>
				{ renderMonitors() }
				</tbody>
			</table>
			<div className='add'>
				<span>Add Channel</span>
				<FontAwesomeIcon className='add' icon={faPlus} onClick={handleAddRow} />
			</div>
		</div>
	);
};

export default MonitorList;
