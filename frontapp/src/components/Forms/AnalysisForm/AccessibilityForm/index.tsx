import { SetStateAction, useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormLabel,
  Slider,
  Box,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Button,
  ButtonGroup,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Info from '@mui/icons-material/Info';

import { AnalysisForm } from '../types';
import { AccessibilityForm } from './types';

import style from './style.module.css';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 100,
    label: '100',
  },
];
const transportModes = [
  {
    value: 'walking',
    label: 'WALKING',
    icon: <DirectionsWalkIcon fontSize='large' color='primary' />,
  },
  {
    value: 'public',
    label: 'PUBLIC',
    icon: <DirectionsBusIcon fontSize='large' color='primary' />,
  },
  {
    value: 'private',
    label: 'PRIVATE',
    icon: <DirectionsCarIcon fontSize='large' color='primary' />,
  },
];

const years = [
  {
    value: '2020',
    label: '2020',
  },
  {
    value: '2023',
    label: '2023',
  },
];

const models = [
  {
    value: 'passive',
    label: 'Passive',
  },
  {
    value: 'active',
    label: 'Active',
  },
];

const AccessibilityForm = ({ formData }: { formData: AnalysisForm }) => {
  const [accessibilityForm, setAccessibilityForm] = useState<AccessibilityForm>(
    formData.accessibilityForm
  );

  const handleChange = (e: any) => {
    setAccessibilityForm((previous: AccessibilityForm) => {
      const newAccessibilityData = {
        ...previous,
        [e.target.name]: e.target.value,
      };

      formData.accessibilityForm = newAccessibilityData;

      return newAccessibilityData;
    });
  };

  function valuetext(value: number) {
    return `${value} min`;
  }
  return (
    <Box className={style.accessibilityFormContainer}>
      <Box
        className={style.formControl}
        sx={{ display: 'flex', mt: '10px', justifyContent: 'space-between' }}
      >
        <FormControl>
          <FormLabel
            id='radio-model-label'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Tooltip title='dasdasdasd'>
              <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
            </Tooltip>
            Accessibility Model
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='radio-model-label'
            name='model'
            onChange={handleChange}
            sx={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
              m: 1,
            }}
            value={accessibilityForm.model}
          >
            {models.map((model) => (
              <FormControlLabel
                key={model.value}
                value={model.value}
                control={<Radio />}
                label={model.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel
            id='radio-year-label'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Tooltip title='dasdasdasd'>
              <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
            </Tooltip>
            Year
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='radio-year-label'
            name='year'
            onChange={handleChange}
            sx={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
              m: 1,
            }}
            value={accessibilityForm.year}
          >
            {years.map((year) => (
              <FormControlLabel
                key={year.value}
                value={year.value}
                control={<Radio />}
                label={year.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <FormControl className={style.formControl}>
        <FormLabel
          id='radio-transport-mode-label'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Transport Mode
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='radio-transport-mode-label'
          name='transportMode'
          onChange={handleChange}
          sx={{
            color: 'black',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            m: 1,
          }}
          value={accessibilityForm.transportMode}
        >
          {transportModes.map((mode) => (
            <FormControlLabel
              key={mode.value}
              value={mode.value}
              control={<Radio />}
              label={<Tooltip title={mode.label}>{mode.icon}</Tooltip>}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl className={style.formControl}>
        <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Travel Time
        </FormLabel>
        <Slider
          aria-label='Always visible'
          getAriaValueText={valuetext}
          step={10}
          marks={marks}
          valueLabelDisplay='on'
          value={accessibilityForm.travelTime}
          name='travelTime'
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};

export default AccessibilityForm;
