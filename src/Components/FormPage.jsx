import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import "./Form.css";
import { CSSTransition } from "react-transition-group";

const questions = [
  {
    text: "What dietary restrictions do you have?",
    options: [
      "Vegan",
      "Vegetarian",
      "Pescetarian",
      "Halal",
      "Gluten-Free",
      "Lactose-Intolerant",
      "None",
    ],
    stepperLabel: "Restrictions",
    id: "dietary",
  },
  {
    text: "What are your allergies?",
    options: [],
    stepperLabel: "Allergies",
    id: "allergies",
  }, // No options for text input
  {
    text: "What are your diet goals?",
    options: [],
    stepperLabel: "Goals",
    id: "goals",
  },
];

function FormPage(props) {
  // props.modifyPreferences

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [userResponses, setUserResponses] = useState([]);
  const [response, setResponse] = useState("");
  const [transitionIn, setTransitionIn] = useState(true);

  const handleNextQuestion = () => {
    // if (currentQuestionIndex === questions.length - 1) {
    //   props.switchToHome();
    // } else {
    //   setUserResponses([...userResponses, response]);
    //   setResponse("");
    //   setTransitionIn(false); // Start fade-out animation
    //   setTimeout(() => {
    //     setTransitionIn(true); // Start fade-in animation
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //   }, 300); // The same duration as your CSS transition
    // }

    if (currentQuestionIndex === questions.length - 1) {
      props.switchToHome();
    } else {
      setTransitionIn(false); // Start fade-out animation
      setTimeout(() => {
        setTransitionIn(true); // Start fade-in animation
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300); // The same duration as your CSS transition
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const isNextDisabled =
    currentQuestion.options.length === 0 &&
    props.preferences[currentQuestion.id].trim() === "" && currentQuestion.id != "allergies" && currentQuestion.id != "goals";

  // Create an array of steps for the Stepper
  const steps = questions.map((question, index) => (
    <Step key={index}>
      <StepLabel
        sx={{
          color: "#453124",
        }}
      >
        {question.stepperLabel}
      </StepLabel>
    </Step>
  ));

  return (
    <Container className="container">
      <Stepper activeStep={currentQuestionIndex} alternativeLabel>
        {steps}
      </Stepper>
      <CSSTransition
        in={transitionIn}
        timeout={300} // The same duration as your CSS transition
        classNames="fade"
      >
        <div className="question">
          <Typography
            sx={{
              color: "#453124",
              fontSize: "30px",
            }}
            className="questionHeader"
          >
            {currentQuestion.text}
          </Typography>
          {currentQuestion.options.length > 0 ? (
            <TextField
              select
              fullWidth
              value={props.preferences[currentQuestion.id]}
              onChange={(e) => props.modifyPreferences(e, currentQuestion.id)}
              variant="standard"
              sx={{ color: "#2b4829" }}
            >
              <MenuItem value="">Select an option</MenuItem>
              {currentQuestion.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              fullWidth
              value={props.preferences[currentQuestion.id]}
              onChange={(e) => props.modifyPreferences(e, currentQuestion.id)}
              placeholder="Type your answer"
              variant="standard"
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={isNextDisabled}
            // sx={{
            //   backgroundColor: "#3e673b",
            //   marginTop: "30px",
            // }}
            style={{
              backgroundColor: "#3e673b",
              marginTop: "30px",
              color: "white",
            }}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </div>
      </CSSTransition>
    </Container>
  );
}

export default FormPage;
