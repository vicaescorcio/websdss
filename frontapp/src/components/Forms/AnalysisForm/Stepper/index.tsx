import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import IconButton from '@mui/material/IconButton';
import Help from '@mui/icons-material/Help';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './style.module.css';

type Step = {
  label: string;
  component: React.ReactNode;
};

export default function HorizontalNonLinearStepper({
  steps,
  onHelperClick,
  onSubmit,
}: {
  steps: Step[];
  onHelperClick: () => void;
  onSubmit: (params: any) => void;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
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

  const handleNext = () => {
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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
      {allStepsCompleted() ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>{steps[activeStep].component}</React.Fragment>
      )}
      <Box className={style.stepperActions}>
        <IconButton onClick={onHelperClick}>
          <Help />
        </IconButton>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>

        {/* {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant='caption' sx={{ display: 'inline-block' }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            // <Button onClick={handleComplete}>
            //   {completedSteps() === totalSteps() - 1
            //     ? 'Finish'
            //     : 'Complete Step'}
            // </Button>
          ))} */}
        <Button className={style.submitButton} onClick={onSubmit} type='submit'>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
