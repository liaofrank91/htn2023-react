import React from 'react'
import { useState } from 'react'
import HomePage from './HomePage'
import FormPage from './FormPage';

function AppContainer() {

  // overwrite these with user responses, if undefined then treat as no dietary/allergies/goals
  const [preferences, setPreferences] = useState({
    dietary: '',
    allergies: '', 
    goals: '',
  });

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

  return (
    <div>
      {screenState === "homepage" && <HomePage switchToForm={switchToForm} preferences={preferences}/>}
      {screenState === "form" && <FormPage switchToHome={switchToHome} preferences={preferences} modifyPreferences={modifyPreferences}/>}
      <div>
        PREFERENCES - dietary: {preferences.dietary}, allergies: {preferences.allergies}, goals: {preferences.goals}
      </div>
    </div>
  )
}

export default AppContainer