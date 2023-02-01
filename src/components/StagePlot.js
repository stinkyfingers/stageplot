import React from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getStagePlot, updateStagePlot } from '../lib/Api';
import { ErrorContext, UserContext } from '../lib/Context';
import PlotLayout from './PlotLayout';
import Pallette from './Pallette';
import InputList from './InputList';
import MonitorList from './MonitorList';
import '../css/stage_plot.css'

const StagePlot = () => {
  const [user] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);
  const { id } = useParams();
  const [stagePlot, setStagePlot] = React.useState();
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
  
  const handleClick = () => {
    updateStagePlot(user.token, stagePlot)
      .then((res) => {
        if (res.error) {
          setErr(res.error)
        } else {
          setStagePlot(res);
        }
      })
      .catch(setErr);
  };
  
  const handleIsPublic = (e) => {
    setStagePlot((current) => ({ ...current, isPublic: !current.isPublic }));
  };
  
  const handleLayout = (icons) => {
    setStagePlot((current) => ({ ...current, icons }));
  }
  
  const handleInputList = (inputList) => {
    setStagePlot((current) => ({ ...current, inputList }))
  }

  const handleMonitorList = (monitorList) => {
    setStagePlot((current) => ({ ...current, monitorList }))
  }
  
  const handlePrint = useReactToPrint({
    content: () => plotLayoutRef.current,
    documentTitle: stagePlot?.name || 'Stage Plot',
  })
  
  if (!stagePlot) return <div>Loading...</div>;
  
	return (
		<div className='stagePlot'>
      <div ref={plotLayoutRef} className='printableStagePlot'>
        <h3>{stagePlot.name}</h3>
        <PlotLayout stagePlot={stagePlot} handleLayout={handleLayout} />
        <Pallette />
        <div className="page-break"/>
        <div className='monitors'>
          <InputList stagePlot={stagePlot} handleInputList={handleInputList} />
          <div className='hr' />
          <MonitorList stagePlot={stagePlot} handleMonitorList={handleMonitorList} />
        </div>
      </div>
      <div className='public'>
          <span>Make Public</span>
          <input type='checkbox' onChange={handleIsPublic} checked={stagePlot.isPublic} />
        </div>
      <div className='buttons'>
        <button onClick={handleClick}>Save</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
	);
};

export default StagePlot;
