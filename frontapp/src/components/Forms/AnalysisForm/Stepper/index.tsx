import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import IconButton from '@mui/material/IconButton';
import Help from '@mui/icons-material/Help';
import Button from '@mui/material/Button';
import style from './style.module.css';

type Step = {
  label: string;
  component: React.ReactNode;
  onValidate: (params: any) => boolean;
};

export default function HorizontalNonLinearStepper({
  steps,
  onHelperClick,
  onSubmit,
  initialStep,
}: {
  steps: Step[];
  onHelperClick: () => void;
  onSubmit: (params: any) => void;
  initialStep: number;
}) {
  const [activeStep, setActiveStep] = React.useState(initialStep);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = (params: any) => {
    const { onValidate } = steps[activeStep];
    if (!onValidate(params)) return;
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmit = (event: any) => {
    handleNext(event);
    onSubmit(event);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box className={style.stepperContainer}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map(({ label, component }, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color='inherit' onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <React.Fragment>{steps[activeStep].component}</React.Fragment>
      <Box className={style.stepperActions}>
        <IconButton onClick={onHelperClick}>
          <Help />
        </IconButton>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={activeStep == steps.length - 1} onClick={handleNext}>
          Next
        </Button>
        <Button
          disabled={activeStep != steps.length - 1}
          className={style.submitButton}
          onClick={handleSubmit}
          type='submit'
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
