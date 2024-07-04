import React, { Fragment, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import StepCar from '@/components/HelperCard/StepCard';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const steps = [
  {
    title: 'Step 1: Select Points of Interest',
    description: (
      <Box>
        <Typography variant='body1' gutterBottom>
          Select the points of interest you want to analyze. You can choose up
          to 4 points of interest. First, select the city and country where you
          want to analyze accessibility. Then, click on Add points of interest
          to pin locations on the blue area of the map. It is recommended to
          select points of interest that are relevant to the population groups
          you want to analyze.
        </Typography>
        <Divider />
      </Box>
    ),
  },
  {
    title: 'Step 2: Set Accessibility Model Parameters',
    description: (
      <Box>
        <Typography variant='body1' gutterBottom>
          Set the parameters for the accessibility model. Choose the mode of
          transportation (e.g., walking, cycling, driving), the distance
          threshold, and the time threshold. These parameters will determine the
          catchment area around each location and the accessibility indicators
          for each population group.
        </Typography>
        <Divider />
      </Box>
    ),
  },
  {
    title: 'Step 3: Add Population Groups Criteria and Weights',
    description: (
      <Box>
        <Typography variant='body1' gutterBottom>
          Add the criteria and weights for the population groups you want to
          analyze. Choose the income range, age range and gender for each group.
        </Typography>
        <Divider />
      </Box>
    ),
  },
  {
    title: 'Step 4: Review & Validate',
    description: (
      <Box>
        <Typography variant='body1' gutterBottom>
          Review the given information and validate the data. Ensure that all
          points of interest are correctly located and that the accessibility
          model parameters are set correctly. If necessary, go back and make any
          adjustments. Once you are satisfied with the data, proceed to the next
          step.
        </Typography>
        <Divider />
      </Box>
    ),
  },
  {
    title: 'Step 5: Submit Form and View Results',
    description: (
      <Box>
        <Typography variant='body1' gutterBottom>
          Submit the form to start the analysis process. The system will
          calculate accessibility indicators for each location and population
          group and perform a multi-criteria analysis to determine the best
          location for the new facility. The final result will be a map showing
          the optimal location based on accessibility and multi-criteria
          analysis.
        </Typography>
        <Divider />
      </Box>
    ),
  },
];

const ProcessExplanation = () => {
  const [changeContent, setChangeContent] = useState(true);
  return (
    <Container
      sx={{
        backgroundColor: 'white',
        opacity: 0.9,
        color: 'black',
        borderRadius: '10px',
        p: 2,
      }}
    >
      <IconButton onClick={() => setChangeContent((previous) => !previous)}>
        {changeContent ? (
          <Fragment>
            How to use it? <ArrowForward />
          </Fragment>
        ) : (
          <Fragment>
            What is it?
            <ArrowBack />
          </Fragment>
        )}
      </IconButton>

      {changeContent ? (
        <Box sx={{ mb: '0px', textAlign: 'center' }}>
          <Typography variant='h4' component='h1' gutterBottom color={'gray'}>
            What is this tool?
          </Typography>
          <Typography variant='body1' gutterBottom>
            This tool provides a simple, easy-to-use multi-criteria spatial
            decision support system for determining the best location for a new
            facility. It is based on multiple criteria and accessibility
            indicators for specific population groups and is intended for urban
            planners, decision-makers, and policymakers. The system uses the
            Cumulative Opportunity Model (K. Geurs and Wee, 2004) to analyze
            accessibility indicators for each location.
            <br />
            <br />
            It aggregates individuals within a catchment area around each
            location and measures accessibility to or from points of interest
            within a specified distance or time threshold (see image bellow to
            understand passive and active analysis). The goal is to assess
            accessibility levels for different socio-demographic groups to
            various points of interest (e.g., schools, hospitals, parks).
            <br />
            <br />
            After calculating accessibility for each group, a multi-criteria
            analysis (e.g., TOPSIS, AHP, ELECTRE, PROMETHEE) is applied to
            determine the best location for the new facility based on
            user-defined weights for these groups. The final result is a map
            showing the optimal location based on accessibility and
            multi-criteria analysis.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={'/explanation.png'}
              alt={'alt'}
              width={700}
              height={400}
            />
          </Box>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mb: '15px', textAlign: 'center' }}>
              <Typography
                variant='h4'
                component='h1'
                gutterBottom
                color={'gray'}
              >
                How to use it?
              </Typography>
              <Typography variant='body1' gutterBottom color={'gray'}>
                Follow the steps bellow to start the analysis process:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <StepCar steps={steps}></StepCar>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProcessExplanation;
