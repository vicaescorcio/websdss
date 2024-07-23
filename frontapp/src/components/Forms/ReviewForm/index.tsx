import {
  Box,
  Divider,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import style from './style.module.css';

import { AnalysisForm as AnalysisFormType } from '../AnalysisForm/types';
import { LocationPoint } from '../AnalysisForm/LocationsForm/types';
import { Groups, LocationOn } from '@mui/icons-material';
import { GroupCriteria } from '../AnalysisForm/MultiCriteriaForm/types';
import { useMapEvents } from 'react-leaflet/hooks';
import LocationMapIconButton from '@/components/Buttons/LocationMapIconButton';

const ReviewForm = ({ formData }: { formData: AnalysisFormType }) => {
  const {
    locationForm: locationFormData,
    accessibilityForm: accessibilityFormData,
    multiCriteriaForm: multiCriteriaFormData,
  } = formData;
  const map = useMapEvents({});
  return (
    <Box className={style.reviewFormContainer}>
      <Divider>Points of Interest</Divider>
      <Box className={style.dividerContainer}>
        {locationFormData.points.map((point: LocationPoint, index) => {
          return (
            <Box key={index} className={style.dividerLocationContainer}>
              <LocationMapIconButton
                map={map}
                coords={[point.longitude, point.latitude]}
              />
              <FormLabel>
                <b>Name:</b> {point.name}
              </FormLabel>
              <FormLabel>
                <b>Lat:</b> {point.latitude.toPrecision(8)}
              </FormLabel>
              <FormLabel>
                <b>Long:</b> {point.longitude.toPrecision(8)}
              </FormLabel>
            </Box>
          );
        })}
      </Box>
      <Divider>Accessibility Parameters</Divider>
      <Box className={style.dividerContainer}>
        <FormLabel sx={{ width: '50%' }}>
          <b>Distance:</b> {accessibilityFormData.distance}
        </FormLabel>
        <FormLabel sx={{ width: '50%' }}>
          <FormLabel sx={{ width: '50%' }}>
            <b>Transport Mode:</b> {accessibilityFormData.transportMode}
          </FormLabel>
        </FormLabel>
        <FormLabel sx={{ width: '50%' }}>
          <b>Year:</b> {accessibilityFormData.year}
        </FormLabel>
        <FormLabel sx={{ width: '50%' }}>
          <b>Model:</b> {accessibilityFormData.model}
        </FormLabel>
        <FormLabel sx={{ width: '50%' }}>
          <b>Travel Time:</b> {accessibilityFormData.travelTime}
        </FormLabel>
      </Box>
      <Divider>Population Group Criterias</Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: '15px',
        }}
      >
        {multiCriteriaFormData.groups.map((group: GroupCriteria, index) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
              }}
              key={index}
            >
              <Groups color={'primary'} />
              <FormLabel>
                <b>Name:</b> {group.name}
              </FormLabel>
              <FormLabel>
                <b>Income Range:</b> {group.incomeRange}
              </FormLabel>
              <FormLabel>
                <b>Age Levels:</b> {group.ageLevel.join(', ')}
              </FormLabel>
              <FormLabel>
                <b>Weight:</b> {group.weight}
              </FormLabel>
              <FormLabel>
                <b>Criteria Type:</b> {group.criteriaType}
              </FormLabel>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ReviewForm;
