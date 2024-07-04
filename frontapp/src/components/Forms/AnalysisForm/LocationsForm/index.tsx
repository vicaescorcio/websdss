import * as React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  Button,
  MenuItem,
  TextField,
  Select,
  Tooltip,
  Divider,
} from '@mui/material';
import { LocationOn, Remove, Info } from '@mui/icons-material';

import style from './style.module.css';

import { LocationForm as LocationFormType, LocationPoint } from './types';
import { AnalysisForm } from '../types';

import fortalezaHexagons from '@/../public/fortaleza-hexgrid-2.json';

export default function LocationForm({
  formData,
  locationFormData,
  setLocationFormData,
  setCityGeoJson,
}: {
  locationFormData: LocationFormType;
  setLocationFormData: React.Dispatch<React.SetStateAction<LocationFormType>>;
  formData: AnalysisForm;
  setCityGeoJson: (value: any) => void;
}) {
  const handleChange = (e: any) => {
    setLocationFormData((previous: LocationFormType) => {
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
          <Tooltip title='Filter city by country'>
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
          <Tooltip title='City where the analysis will take place.'>
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
              locationFormData.points.length === 0
            )
          }
          onClick={(e) => {
            if (locationFormData.points.length === 0)
              setCityGeoJson(fortalezaHexagons);
          }}
          className={style.searchButton}
          size='large'
          variant='contained'
        >
          ADD POINT OF INTEREST
        </Button>
      </FormControl>
      <Divider sx={{ mb: '20px' }} />
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
                mb: '10px',
                justifyContent: 'space-between',
              }}
            >
              <LocationOn color={'primary'} />
              <TextField
                label={`Point ${index + 1}`}
                sx={{ width: '30%' }}
                value={
                  locationFormData.points.find((el) => point.hexId == el.hexId)
                    ?.name
                }
                size='small'
                onChange={(e) => {
                  formData.locationForm.points =
                    formData.locationForm.points.map((el) => {
                      if (el.hexId == point.hexId) el.name = e.target.value;
                      return el;
                    });

                  setLocationFormData((previous: LocationFormType) => {
                    const newLocationData = {
                      ...previous,
                      points: formData.locationForm.points,
                    };
                    return newLocationData;
                  });
                }}
              ></TextField>
              <FormLabel>Lat: {point.latitude.toPrecision(8)}</FormLabel>
              <FormLabel>Long: {point.longitude.toPrecision(8)}</FormLabel>
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
