import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';

import '../css/input_list.css';

const InputList = ({ stagePlot, handleInputList }) => {
	const [inputErr, setInputErr] = React.useState();
	const newChannel = !stagePlot.inputList ? 1 : stagePlot.inputList[stagePlot.inputList.length - 1].channel + 1;
	const handleAddRow = () => {
		if (!stagePlot.inputList) {
			handleInputList([{ name: '', channel: newChannel }]);
			return;
		}
		stagePlot.inputList.push({ name: '', channel: newChannel });
		handleInputList(stagePlot.inputList)
	};
	const handleChange = (e) => {
		setInputErr(null);
		const index = parseInt(e.target.getAttribute('data-index'), 10);
		const value = e.target.name === 'channel' ? parseInt(e.target.value, 10) : e.target.value;
		if (!value) {
			setInputErr('value is required');
			return
		}
		stagePlot.inputList[index][e.target.name] = value;
		handleInputList(stagePlot.inputList);
	};
	
	const handleRemove = (index) => {
		stagePlot.inputList.splice(index, 1)
		handleInputList(stagePlot.inputList);
	};
	
	const renderInputs = () => {
		if (!stagePlot.inputList) return null;
		return (
			stagePlot.inputList.map((input, i) => (
				<tr key={`${input.channel}-${i}`}>
					<td>
						<input className='channel' type='number' min='0' max='128' onChange={handleChange} name='channel' data-index={i} value={input.channel} />
					</td>
					<td>
						<input className='name' type='text' placeholder='Name' onChange={handleChange} name='name' data-index={i} value={input.name} />
					</td>
					<td>
						<FontAwesomeIcon className='delete' icon={faRemove} onClick={() => handleRemove(i)} />
					</td>
				</tr>
			))
		)
	};


	
	return (
		<div className='inputList'>
			{ inputErr && <div className='error'>{inputErr}</div> }
			<h3>Inputs</h3>
			<table>
				<thead>
					<tr>
						<th>Channel</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
				{ renderInputs() }
				</tbody>
			</table>
			<div className='add'>
				<span>Add Channel</span>
				<FontAwesomeIcon className='add' icon={faPlus} onClick={handleAddRow} />
			</div>
    </div>
	);
};

export default InputList;
