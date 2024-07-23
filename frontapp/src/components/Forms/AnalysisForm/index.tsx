'use client';
import { useState, useRef, Fragment, MutableRefObject } from 'react';
import {
  Fab,
  Slide,
  Box,
  Typography,
  Modal,
  LinearProgress,
  Container,
  Alert,
  Button,
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
import ReviewForm from '../ReviewForm';
import ResultForm from './ResultForm';
import { AnalysisResult } from '@/app/api/accessibility/types';
import { ResultsFilter } from './ResultForm/types';

const AnalysisForm = ({
  locationFormData,
  setLocationFormData,
  analysisFormData,
  setCityGeoJson,
  handleSubmit,
  submitting,
  results,
  resultsFilter,
  setResultsFilter,
  resetAnalysis,
}: {
  locationFormData: LocationFormTypes.LocationForm;
  setLocationFormData: React.Dispatch<
    React.SetStateAction<LocationFormTypes.LocationForm>
  >;
  analysisFormData: MutableRefObject<AnalysisFormType>;
  setCityGeoJson: (value: any) => void;
  handleSubmit: (params: any) => void;
  submitting: boolean;
  results: AnalysisResult | null;
  resultsFilter: ResultsFilter | null;
  setResultsFilter: (value: any) => void;
  resetAnalysis: () => void;
}) => {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [openHelperModal, setOpenHelperModal] = useState(false);
  const [errors, setErrors] = useState<string[]>();
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
      onValidate: (params: any) => {
        if (analysisFormData.current.locationForm.points.length < 1) {
          setErrors(['Please select at least one location']);
          setTimeout(() => {
            setErrors([]);
          }, 2000);
          return false;
        } else {
          return true;
        }
      },
    },
    {
      label: 'Set accessibility model parameters',
      component: <AccessibilityForm formData={analysisFormData.current} />,
      onValidate: (params: any) => {
        if (!analysisFormData.current.accessibilityForm.model) {
          setErrors(['Please select an accessibility model']);
          setTimeout(() => {
            setErrors([]);
          }, 4000);
          return false;
        } else {
          return true;
        }
      },
    },
    {
      label: 'Add Population Group criteria and weights',
      component: <MultiCriteriaForm formData={analysisFormData.current} />,
      onValidate: (params: any) => {
        if (analysisFormData.current.multiCriteriaForm.groups.length < 1) {
          setErrors(['Please add at least one group']);
          setTimeout(() => {
            setErrors([]);
          }, 4000);
          return false;
        } else {
          return true;
        }
      },
    },
    {
      label: 'Review and Submit',
      component: <ReviewForm formData={analysisFormData.current} />,
      onValidate: (params: any) => {
        setTimeout(() => {
          setErrors([]);
        }, 4000);
        return true;
      },
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
            {errors && errors.length > 0 && (
              <Alert severity='error'>{errors.join(', ')}</Alert>
            )}
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
            ) : results ? (
              <ResultForm
                results={results}
                analysisFormData={analysisFormData.current}
                resultsFilter={resultsFilter}
                setResultsFilter={setResultsFilter}
                resetAnalysis={resetAnalysis}
              />
            ) : (
              <Stepper
                steps={steps}
                onHelperClick={() => {
                  setOpenHelperModal(true);
                }}
                onSubmit={handleSubmit}
                initialStep={0}
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
