import React from 'react'

function Results(props) {

  return (
    <>
      {props.resultObj && props.resultObj.map((item) => (
        <div>{item.name}</div>
      ))}
    </>
  )
}

export default Results