'use client';
import { useFormState } from 'react-dom';
import { useState, useRef, Fragment, MutableRefObject } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stepper from './Stepper';
import LocationForm from './LocationsForm';
import AccessibilityForm from './AccessibilityForm';
import MultiCriteriaForm from './MultiCriteriaForm';
import { startAnalysis, AnalysisFormState } from './actions';

import style from './style.module.css';

import { AnalysisForm } from './types';
import * as LocationFormTypes from './LocationsForm/types';

const initialState: AnalysisFormState = {
  locations: [],
  accessibility: {
    mode: 'walking',
    distance: 1000,
  },
  criteria: [],
};

const AnalysisForm = ({
  locationFormData,
  setLocationFormData,
  analysisFormData,
  setCityGeoJson,
}: {
  locationFormData: LocationFormTypes.LocationForm;
  setLocationFormData: React.Dispatch<
    React.SetStateAction<LocationFormTypes.LocationForm>
  >;
  analysisFormData: MutableRefObject<AnalysisForm>;
  setCityGeoJson: (value: any) => void;
}) => {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [state, formAction] = useFormState(startAnalysis, initialState);

  const steps = [
    {
      label: 'Select Points of Interest',
      component: (
        <LocationForm
          locationFormData={locationFormData}
          setLocationFormData={setLocationFormData}
          formData={analysisFormData.current}
          setCityGeoJson={setCityGeoJson}
        />
      ),
    },
    {
      label: 'Set accessibility model parameters',
      component: <AccessibilityForm formData={analysisFormData.current} />,
    },
    {
      label: 'Add Population Group criteria and weights',
      component: <MultiCriteriaForm formData={analysisFormData.current} />,
    },
  ];

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Fragment>
      <Box className={style.analysisFormContainer}>
        <Slide in={checked} container={containerRef.current}>
          <Box
            component='form'
            action={formAction}
            className={style.analysisForm}
          >
            <Stepper steps={steps}></Stepper>
          </Box>
        </Slide>
      </Box>
      <Button
        className={style.analysisOpenButton}
        variant='contained'
        disableElevation
        onClick={handleChange}
      >
        Open Analysis Form
      </Button>
    </Fragment>
  );
};

export default AnalysisForm;
