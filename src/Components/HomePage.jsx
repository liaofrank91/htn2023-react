import React from 'react';
import CameraBox from './CameraBox';

function HomePage(props) {

  return (
    <>
      <div className="homepage-container">
        <CameraBox preferences={props.preferences}/>
      </div>
      <button type="button" onClick={() => props.switchToForm()}>Modify preferences</button>
    </>
  )
}

export default HomePage