'use client';
import { useFormState } from 'react-dom';
import { useState, useRef, Fragment, MutableRefObject } from 'react';
import { Fab, Slide, Box } from '@mui/material';
import LocationForm from './LocationsForm';
import AccessibilityForm from './AccessibilityForm';
import MultiCriteriaForm from './MultiCriteriaForm';
import Stepper from './Stepper';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { startAnalysis, AnalysisFormState } from './actions';

import { AnalysisForm } from './types';
import * as LocationFormTypes from './LocationsForm/types';

import style from './style.module.css';

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
  const OpenFormButtonContent = checked ? (
    <Fragment>
      <ArrowDownward sx={{ mr: 2 }} />
      Close Analysis Form
    </Fragment>
  ) : (
    <Fragment>
      <ArrowUpward sx={{ mr: 2 }} />
      Open Analysis Form
    </Fragment>
  );

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

  const openForm = () => {
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

      <Fab
        onClick={openForm}
        className={style.analysisOpenButton}
        variant='extended'
        color='primary'
      >
        {OpenFormButtonContent}
      </Fab>
    </Fragment>
  );
};

export default AnalysisForm;
