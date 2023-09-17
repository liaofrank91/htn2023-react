import React from 'react'
import "./results.css"
import { PiCarrot } from 'react-icons/pi'
import { ImSpoonKnife } from 'react-icons/im'
import { MdFastfood} from 'react-icons/md'
function Results(props) {

  console.log(props.resultObj[0].reason);

  return (
    <div style={{height: "100vh", width: "100vw", display:"flex", justifyContent:"space-around", alignItems:"center", flexDirection:"column", backgroundColor:"#f6f6db"}}>
      <div className='resultsTitle'>Smart Bites</div>
      {/* {props.resultObj && props.resultObj.map((item) => (
        <div>{item.name}</div>
      ))} */}
      <div style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
        <div className='card1'>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}> 
            <PiCarrot size={30}/>
            <div className='cardHeader'>{props.resultObj[0].name}</div>
          </div>
          
          <ul>
            {props.resultObj[0].reason.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className='card2'>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}> 
            <ImSpoonKnife size={30}/>
            <div className='cardHeader'>{props.resultObj[1].name}</div>
          </div>
          <ul>
            {props.resultObj[1].reason.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className='card1'>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}> 
            <MdFastfood size={30}/>
            <div className='cardHeader'>{props.resultObj[2].name}</div>
          </div>
          <ul>
            {props.resultObj[2].reason.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      
      <button onClick={props.switchToHome} type="button" style={{width:"270px", height:"55px", fontSize:"18px", backgroundColor:"#2b4829", borderColor:"#2b4829", borderRadius:"10px", color:"#ecebc9"}}>Return Home</button>
    </div>
  )
}

export default Results