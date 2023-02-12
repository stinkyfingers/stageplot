import React from 'react';
import { getStagePlot } from '../lib/Api';
import { ErrorContext, UserContext } from '../lib/Context';
import { useParams } from 'react-router-dom';
import PlotLayout from './PlotLayout';
import '../css/view_only.css';
import { useReactToPrint } from 'react-to-print';

const InputList = ({ stagePlot }) => {
	return (
		<div className='viewInputList'>
			{stagePlot.inputList.map((input) => (
				<div key={`input${input.channel}`} className='viewInput'>
					<span className='inputChannel'>{input.channel}</span>
					<span className='inputName'>{input.name}</span>
				</div>
			))}
		</div>
	);
};

const MonitorList = ({ stagePlot }) => {
	const inputChannelMap = {};
	stagePlot.inputList.forEach((input) => {
		inputChannelMap[input.channel] = input.name;
	});
	return (
		<div className='viewMonitorList'>
			{stagePlot.monitorList.map((monitor) => (
				<div key={`input${monitor.channel}`} className='viewMonitor'>
					<span className='monitorChannel'>{monitor.channel}</span>
					<span className='monitorName'>{monitor.name}</span>
					<div className='viewMonitorLevels'>
						{monitor.monitorLevels.map((level) => (
							<div key={`monitor-${monitor.channel}-${level.inputChannel}`} className='viewMonitorLevel'>
								<span className='monitorLevelInputLevel'>{level.inputChannel} {inputChannelMap[level.inputChannel]}</span>
								<span className='monitorLevelChannel'>{level.level}%</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

const ViewOnly = () => {
	const [stagePlot, setStagePlot] = React.useState();
	const [user] = React.useContext(UserContext);
	const [, setErr] = React.useContext(ErrorContext);
	const { id } = useParams();
	const plotLayoutRef = React.useRef();

	React.useEffect(() => {
		getStagePlot(user.token, id)
			.then((res) => {
				if (res.error) {
					setErr(res.error)
				} else {
					setStagePlot(res);
				}
			})
			.catch(setErr);
	}, [id, setStagePlot, setErr, user.token]);

	const handlePrint = useReactToPrint({
		content: () => plotLayoutRef.current,
		documentTitle: stagePlot?.name || 'Stage Plot',
	})
	
	if (!stagePlot) return null;
	return (
		<div className='viewOnly'>
			<button onClick={handlePrint} className='printButton'>Print</button>
			<div className='printableStagePlot' ref={plotLayoutRef}>
				<h3>{stagePlot.name}</h3>
				<PlotLayout stagePlot={stagePlot} />
				<div className="page-break"/>
				<InputList stagePlot={stagePlot} />
				<MonitorList stagePlot={stagePlot} />
			</div>
		</div>
	);
};

export default ViewOnly;
