import * as React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  Button,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { LocationOn, Remove, Info } from '@mui/icons-material';

import style from './style.module.css';

import { LocationForm, LocationPoint } from './types';
import { AnalysisForm } from '../types';

export default function LocationForm({ formData }: { formData: AnalysisForm }) {
  const [locationFormData, setLocationFormData] = React.useState<LocationForm>(
    formData.locationForm
  );

  const handleChange = (e: any) => {
    setLocationFormData((previous: LocationForm) => {
      const newLocationData = {
        ...previous,
        [e.target.name]: e.target.value,
      };

      formData.locationForm = newLocationData;

      return newLocationData;
    });
  };

  return (
    <Box className={style.locationFormContainer}>
      <FormControl className={style.formControl}>
        <InputLabel id='label-country' className={style.inputLabel}>
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>{' '}
          Country
        </InputLabel>
        <Select
          labelId='label-country'
          id='country'
          name='country'
          value={locationFormData.country}
          label='Country'
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'brasil'}>Brasil</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={style.formControl}>
        <InputLabel
          id='label-city'
          className={style.inputLabel}
          sx={{ pointerEvents: 'auto' }}
        >
          {' '}
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          City
        </InputLabel>

        <Select
          labelId='label-city'
          id='city'
          name='city'
          value={locationFormData.city}
          label='City'
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'fortaleza'}>Fortaleza</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={style.formControl}>
        <Button
          disabled={
            !(
              locationFormData.city &&
              locationFormData.city.length > 0 &&
              locationFormData.country &&
              locationFormData.country.length > 0 &&
              locationFormData.points.length < 4
            )
          }
          onClick={(e) => {
            setLocationFormData((previous: LocationForm) => {
              const newLocationData = {
                ...previous,
                points: [
                  ...previous.points,
                  {
                    latitude: 0,
                    longitude: 0,
                    name: 'Point',
                  } as LocationPoint,
                ],
              };

              formData.locationForm = newLocationData;

              return newLocationData;
            });
          }}
          className={style.searchButton}
          size='large'
          variant='contained'
        >
          ADD POINT OF INTEREST
        </Button>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          mt: '5px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {locationFormData.points.map((point: LocationPoint, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: '5px',
                justifyContent: 'space-between',
              }}
            >
              <LocationOn color={'primary'} />
              <FormLabel>Point {index + 1}</FormLabel>
              <IconButton
                onClick={(e) => {
                  setLocationFormData((previous: LocationForm) => {
                    const newPoints = previous.points.filter(
                      (el, i) => i !== index
                    );
                    const newLocationData = { ...previous, points: newPoints };
                    formData.locationForm = newLocationData;

                    return newLocationData;
                  });
                }}
                color='error'
              >
                <Remove />
              </IconButton>
            </Box>
          );
        })}
      </Box>

      <input
        name='points'
        type='hidden'
        value={JSON.stringify(locationFormData.points)}
      />
    </Box>
  );
}
