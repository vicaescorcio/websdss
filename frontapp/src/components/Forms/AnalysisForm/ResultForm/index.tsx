import {
  Box,
  Button,
  Chip,
  FormLabel,
  Icon,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import style from './style.module.css';
import { AnalysisResult, RankedResult } from '@/app/api/accessibility/types';
import { ResultsFilter } from './types';
import { AnalysisForm } from '../types';
import { EmojiEvents, Group, TravelExplore } from '@mui/icons-material';
import { Fragment, useState } from 'react';
import ReviewForm from '../../ReviewForm';

const POINTS_COLOR = ['red', 'blue', 'green', 'yellow'];

const ResultForm = ({
  results,
  analysisFormData,
  resultsFilter,
  setResultsFilter,
  resetAnalysis,
}: {
  results: AnalysisResult | null;
  analysisFormData: AnalysisForm;
  resultsFilter: ResultsFilter | null;
  setResultsFilter: (value: any) => void;
  resetAnalysis: () => void;
}) => {
  const { rankedResults } = results || {};
  const [showResult, setShowResult] = useState(true);
  const {
    locationForm: { points },
    multiCriteriaForm: { groups },
  } = analysisFormData;

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Button
          color='primary'
          size={showResult ? 'large' : 'small'}
          onClick={() => setShowResult(false)}
          sx={{
            textAlign: 'center',
            width: '50%',
            mb: 2,
            alignSelf: 'center',
            borderBottom: showResult ? 'none' : '1px solid',
          }}
        >
          INPUTS
        </Button>
        <Button
          color='primary'
          size={showResult ? 'small' : 'large'}
          onClick={() => setShowResult(true)}
          sx={{
            textAlign: 'center',
            width: '50%',
            mb: 2,
            alignSelf: 'center',
            borderBottom: showResult ? '1px solid' : 'none',
          }}
        >
          RESULTS
        </Button>
      </Box>
      {showResult ? (
        <Box className={style.resultFormContainer}>
          {rankedResults?.map((r: RankedResult, index) => {
            const point = points.find((p) => p.hexId === r[0]);

            const ResultContainer = (
              <Box key={index} className={style.resultsContainer}>
                <Chip
                  label={`${index + 1}`}
                  sx={{ borderColor: POINTS_COLOR[index], borderWidth: 2 }}
                  variant='outlined'
                />
                <FormLabel sx={{ mt: 2 }} component='legend'>
                  <Icon>
                    <EmojiEvents
                      sx={{
                        color:
                          ['#dddd6e', '#bdbdbd', '#986634'][index] || '#986634',
                      }}
                    />
                  </Icon>
                </FormLabel>
                <Typography variant='h6'>{point?.name}</Typography>
                <FormLabel sx={{ mt: 1 }} component='legend'>
                  Hex
                </FormLabel>
                <Typography variant='body1'> {point?.hexId}</Typography>
                <FormLabel sx={{ mt: 1 }} component='legend'>
                  Latitude
                </FormLabel>
                <Typography variant='body1'>
                  {point?.latitude.toPrecision(7)}
                </Typography>
                <FormLabel sx={{ mt: 1 }} component='legend'>
                  Longitude
                </FormLabel>
                <Typography variant='body1'>
                  {point?.longitude.toPrecision(7)}
                </Typography>
              </Box>
            );
            return ResultContainer;
          })}
          <Typography
            sx={{
              textAlign: 'center',
              width: '100%',
              mt: 3,
              alignSelf: 'center',
            }}
            variant='subtitle2'
            color='primary'
          >
            SCORES:
          </Typography>
          <Box
            sx={{ padding: '15px', height: '300px', overflowY: 'scroll' }}
            className={style.resultFormContainer}
          >
            {rankedResults?.map((r: RankedResult, index) => {
              const ResultContainer = (
                <Box key={index} className={style.resultsContainer}>
                  {Object.keys(r[1]).map((key) => {
                    return (
                      <Fragment key={key}>
                        <Icon>
                          <Group
                            sx={{
                              color: POINTS_COLOR[index],
                              mt: 1,
                            }}
                          />
                        </Icon>
                        <FormLabel sx={{ mt: 1 }} component='legend'>
                          {key}
                        </FormLabel>
                        <Typography key={key} variant='body1'>
                          {r[1][key].total.toPrecision(5)}
                        </Typography>

                        <IconButton
                          onClick={() =>
                            setResultsFilter({ hex: r[0], group: key })
                          }
                          color='primary'
                        >
                          <Tooltip title='Explore this result on map'>
                            <TravelExplore />
                          </Tooltip>
                        </IconButton>
                      </Fragment>
                    );
                  })}
                </Box>
              );
              return ResultContainer;
            })}
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: 3,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button disabled>Export in CSV</Button>
            <Button onClick={resetAnalysis}>New Analysis</Button>
          </Box>
        </Box>
      ) : (
        <ReviewForm formData={analysisFormData}></ReviewForm>
      )}
    </Fragment>
  );
};

export default ResultForm;
