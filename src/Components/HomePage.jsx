import React from 'react';
import CameraBox from './CameraBox';

function HomePage(props) {

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "black", }}>
      <div style={{ fontSize: "35px", height: "10%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <b>SMART BITES</b>
      </div>
      <div style={{ height: "75%" }}>
        <CameraBox preferences={props.preferences} setResultObj={props.setResultObj}/>
      </div>
      <div style={{ height: "15%", display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
        <button type="button" onClick={() => props.switchToForm()} style={{width:"270px", height:"55px", fontSize:"18px", backgroundColor:"#2b4829", borderColor:"#2b4829", borderRadius:"10px", color:"#ecebc9"
        }}>Modify Preferences</button>
        {/* <div>
          PREFERENCES - dietary: {props.preferences.dietary}, allergies: {props.preferences.allergies}, goals: {props.preferences.goals}
        </div> */}
      </div>

    </div>
  )
}

export default HomePage