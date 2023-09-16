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
    ],
    stepperLabel: "Dietary Restrictions",
  },
  {
    text: "What are your allergies? (seperate with commas)",
    options: [],
    stepperLabel: "Allergies",
  }, // No options for text input
  {
    text: "What are your diet goals?",
    options: [],
    stepperLabel: "Goals",
  },
];

function FormPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [response, setResponse] = useState("");
  const [transitionIn, setTransitionIn] = useState(true);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      console.log(userResponses); // Log "Hello" to the console after the last question.
    } else {
      setUserResponses([...userResponses, response]);
      setResponse("");
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
    currentQuestion.options.length === 0 && response.trim() === "";

  // Create an array of steps for the Stepper
  const steps = questions.map((question, index) => (
    <Step key={index}>
      <StepLabel>{question.stepperLabel}</StepLabel>
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
          <Typography variant="h4">{currentQuestion.text}</Typography>
          {currentQuestion.options.length > 0 ? (
            <TextField
              select
              fullWidth
              value={response}
              onChange={(e) => setResponse(e.target.value)}
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
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your answer"
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={isNextDisabled}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </div>
      </CSSTransition>
    </Container>
  );
}

export default FormPage;
