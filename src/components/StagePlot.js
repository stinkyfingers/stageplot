import React from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const [canEdit, setCanEdit] = React.useState(false);
  
  React.useEffect(() => {
    if (!user || !stagePlot) return;
    const id = user.stagePlotIds.find((id) => id === stagePlot.id)
    if (id) setCanEdit(true);
  }, [user, stagePlot]);
  
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

  if (!canEdit) return <div>Cannot edit this Stage Plot as user {user.email}</div>
  if (!stagePlot) return <div>Loading...</div>;
	return (
		<div className='stagePlot'>
      <div className='printableStagePlot'>
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
        <Link to={`/${stagePlot.id}`}>View/Print</Link>
      </div>
    </div>
	);
};

export default StagePlot;
