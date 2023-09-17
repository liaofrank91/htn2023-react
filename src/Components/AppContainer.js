import React from 'react'
import { useState } from 'react'
import HomePage from './HomePage'
import FormPage from './FormPage';
import Results from './Results';

function AppContainer() {

  // overwrite these with user responses, if undefined then treat as no dietary/allergies/goals
  const [preferences, setPreferences] = useState({
    dietary: '',
    allergies: '',
    goals: '',
  });

  const [resultObj, setResultObj] = useState(undefined);

  const modifyPreferences = (e, id) => {
    setPreferences((prev) => {
      return {
        ...prev,
        [id]: e.target.value,
      }
    })
  }

  // const modifyPreferences = (arr) => {
  //   setPreferences({
  //     dietary: arr[0],
  //     allergies: arr[1],
  //     goals: arr[2],
  //   })
  // }

  const [screenState, setScreenState] = useState('homepage');

  const switchToForm = () => {
    setScreenState('form');
  }
  const switchToHome = () => {
    setScreenState('homepage');
  }
  const switchToResults = () => {
    setScreenState('results');
  }

  return (
    <>
      {screenState === "homepage" && <HomePage switchToForm={switchToForm} preferences={preferences} setResultObj={setResultObj} />}
      {screenState === "form" && <FormPage switchToHome={switchToHome} switchToResults={switchToResults} preferences={preferences} modifyPreferences={modifyPreferences} />}
      {screenState === "results" && <Results resultObj={resultObj} />}
    </>
  )
}

export default AppContainer