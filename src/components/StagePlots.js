import React from 'react';
import { createStagePlot, listStagePlots, updateStagePlot } from '../lib/Api';
import { ErrorContext, UserContext } from '../lib/Context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEye } from '@fortawesome/free-solid-svg-icons';

import '../css/stage_plots.css';

const CreateStagePlot = ({ onUpdate, stagePlot, setStagePlot }) => {
	const [user] = React.useContext(UserContext);
	const [, setErr] = React.useContext(ErrorContext);
	const handleChange = (e) => {
		setStagePlot((current) => ({ ...current, name: e.target.value }));
	};
	const handleClick = () => {
		if (stagePlot.id) {
			updateStagePlot(user.token, stagePlot)
				.then((res) => {
					if (res.error) {
						setErr(res.error);
					} else {
						setStagePlot(res);
						onUpdate();
					}
				})
				.catch(setErr);
		} else {
			createStagePlot(user.token, stagePlot)
				.then((res) => {
					if (res.error) {
						setErr(res.error);
					} else {
						setStagePlot(res);
						onUpdate();
					}
				})
				.catch(setErr);
		}
	};
	const handleCancel = () => {
		setStagePlot(null);
	};
	return (
		<div className='createBand'>
			<input type='text' onChange={handleChange} placeholder='Stage Plot Name' defaultValue={stagePlot.name} />
			<button onClick={handleClick}>Save</button>
			<button onClick={handleCancel} className='cancel'>Cancel</button>
		</div>
	);
};


const StagePlots = () => {
	const [user] = React.useContext(UserContext);
	const [, setErr] = React.useContext(ErrorContext);

	const [stagePlots, setStagePlots] = React.useState([]);
	const [stagePlot, setStagePlot] = React.useState();
	const [refresh, setRefresh] = React.useState(true);
	
	React.useEffect(() => {
		listStagePlots(user.token)
			.then((res) => {
				if (res && res.error) {
					setErr(res.error);
				} else {
					setStagePlots(res)
				}
			})
			.catch(setErr)
	}, [setStagePlots, setErr, user.token]);

	const renderStagePlots = () => (
		<ul className='stagePlots'>{ stagePlots.map((stagePlot) => (
			<li key={stagePlot.id}>
				<Link to={`/edit/${stagePlot.id}`}>{stagePlot.name}</Link>
				<FontAwesomeIcon icon={faPencil} onClick={() => setStagePlot(stagePlot)} className='edit' />
				<Link to={`/${stagePlot.id}`}><FontAwesomeIcon icon={faEye} className='view'/></Link>
			</li>
		)) }
		</ul>
	);
	const onUpdate = () => {
		setRefresh(!refresh);
	};
	const handleClick = () => {
		setStagePlot({});
	};
	return (
		<div>
			{ stagePlot && <CreateStagePlot onUpdate={onUpdate} stagePlot={stagePlot} setStagePlot={setStagePlot} /> }
			{ stagePlots && renderStagePlots() }
			<button onClick={handleClick}>New Stage Plot</button>
		</div>
	);
};

export default StagePlots;
