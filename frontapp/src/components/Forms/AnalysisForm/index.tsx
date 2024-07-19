'use client';
import { useState, useRef, Fragment, MutableRefObject } from 'react';
import {
  Fab,
  Slide,
  Box,
  Typography,
  Modal,
  LinearProgress,
  CircularProgress,
  Container,
} from '@mui/material';
import LocationForm from './LocationsForm';
import AccessibilityForm from './AccessibilityForm';
import MultiCriteriaForm from './MultiCriteriaForm';
import Stepper from './Stepper';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { AnalysisForm as AnalysisFormType } from './types';
import * as LocationFormTypes from './LocationsForm/types';

import style from './style.module.css';
import HelperCard from '@/components/HelperCard';

const AnalysisForm = ({
  locationFormData,
  setLocationFormData,
  analysisFormData,
  setCityGeoJson,
  handleSubmit,
  submitting,
}: {
  locationFormData: LocationFormTypes.LocationForm;
  setLocationFormData: React.Dispatch<
    React.SetStateAction<LocationFormTypes.LocationForm>
  >;
  analysisFormData: MutableRefObject<AnalysisFormType>;
  setCityGeoJson: (value: any) => void;
  handleSubmit: (params: any) => void;
  submitting: boolean;
}) => {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [openHelperModal, setOpenHelperModal] = useState(false);
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
          <Box component='form' className={style.analysisForm}>
            {submitting ? (
              <Container>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <Typography variant='body2'>Calculating...</Typography>
                </Box>
                <LinearProgress />
              </Container>
            ) : (
              <Stepper
                steps={steps}
                onHelperClick={() => {
                  setOpenHelperModal(true);
                }}
                onSubmit={handleSubmit}
              ></Stepper>
            )}
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

      <Modal
        open={openHelperModal}
        onClose={() => {
          setOpenHelperModal(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <HelperCard />
      </Modal>
    </Fragment>
  );
};

export default AnalysisForm;
