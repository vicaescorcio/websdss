import { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  SelectChangeEvent,
  Box,
  RadioGroup,
  Button,
  Radio,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import { Remove, Groups, Info } from '@mui/icons-material';
import style from './style.module.css';
import { AnalysisForm } from '../types';
import { GroupCriteria, MultiCriteriaForm } from './types.d';

const MultiCriteriaForm = ({ formData }: { formData: AnalysisForm }) => {
  const [multiCriteriaForm, setMultiCriteriaForm] = useState<MultiCriteriaForm>(
    formData.multiCriteriaForm
  );

  const handleChange = (e: any) => {
    setMultiCriteriaForm((previous: MultiCriteriaForm) => {
      const newMultiCriteriaData = {
        ...previous,
        [e.target.name]: e.target.value,
      };

      formData.multiCriteriaForm = newMultiCriteriaData;

      return newMultiCriteriaData;
    });
  };
  return (
    <Box className={style.multiCriteriaFormContainer}>
      <FormControl className={style.formControl}>
        <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Income Range
        </FormLabel>
        <Slider
          getAriaLabel={() => 'Renda'}
          value={multiCriteriaForm.incomeRange}
          max={200000}
          onChange={handleChange}
          name='incomeRange'
          valueLabelDisplay='auto'
          getAriaValueText={function valuetext(value: number) {
            return `R$${value}`;
          }}
        />
      </FormControl>
      <FormControl className={style.formControl}>
        <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Age Range
        </FormLabel>
        <Slider
          getAriaLabel={() => 'Age Range'}
          value={multiCriteriaForm.ageRange}
          max={100}
          onChange={handleChange}
          name='ageRange'
          valueLabelDisplay='auto'
          getAriaValueText={function valuetext(value: number) {
            return `R$${value}`;
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel
          id='radio-gender-label'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Tooltip title='dasdasdasd'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Gender
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='radio-gender-label'
          name='gender'
          onChange={handleChange}
          sx={{ color: 'black' }}
          value={multiCriteriaForm.gender}
        >
          <FormControlLabel value='female' control={<Radio />} label='Female' />
          <FormControlLabel value='male' control={<Radio />} label='Male' />
          <FormControlLabel value='other' control={<Radio />} label='Other' />
        </RadioGroup>
      </FormControl>

      <FormGroup className={style.formControl}>
        <Button
          onClick={(e) => {
            setMultiCriteriaForm((previous: MultiCriteriaForm) => {
              const newMultiCriteriaData = {
                ...previous,
                groups: [
                  ...previous.groups,
                  {
                    name: '',
                    weight: 0,
                    incomeRange: multiCriteriaForm.incomeRange,
                    ageRange: multiCriteriaForm.ageRange,
                  } as GroupCriteria,
                ],
              };

              formData.multiCriteriaForm = newMultiCriteriaData;

              return newMultiCriteriaData;
            });
          }}
          disabled={multiCriteriaForm.groups.length > 3}
          className={style.searchButton}
          size='large'
          variant='contained'
        >
          ADD GROUP
        </Button>
      </FormGroup>

      <Box
        sx={{
          display: 'flex',
          mt: '5px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {multiCriteriaForm.groups.map((group, index) => {
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
              <Groups color={'primary'} />
              <FormLabel>Group {index + 1}</FormLabel>
              <FormControl>
                <InputLabel htmlFor='outlined-adornment-latitude'>
                  Weight
                </InputLabel>
                <OutlinedInput
                  type='number'
                  size='small'
                  sx={{ width: '60%' }}
                  id='outlined-adornment-name'
                  label='weight'
                />
              </FormControl>
              <IconButton
                onClick={(e) => {
                  setMultiCriteriaForm((previous: MultiCriteriaForm) => {
                    const newGroups = previous.groups.filter(
                      (el, i) => i !== index
                    );
                    const newMultiCriteriaData = {
                      ...previous,
                      groups: newGroups,
                    };
                    formData.multiCriteriaForm = newMultiCriteriaData;

                    return newMultiCriteriaData;
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
    </Box>
  );
};

export default MultiCriteriaForm;
