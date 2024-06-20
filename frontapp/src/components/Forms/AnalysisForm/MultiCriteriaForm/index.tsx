import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Slider,
  FormControlLabel,
  FormGroup,
  Box,
  RadioGroup,
  Button,
  Radio,
  IconButton,
  InputLabel,
  OutlinedInput,
  Divider,
  Tooltip,
  TextField,
} from '@mui/material';
import { Remove, Groups, Info, RemoveCircleOutline } from '@mui/icons-material';
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
      <Divider sx={{ mb: '20px' }} />
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

      <Divider sx={{ mb: '20px' }} />
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
      <Divider sx={{ mb: '20px' }} />

      <FormGroup className={style.formControl}>
        <Button
          onClick={(e) => {
            setMultiCriteriaForm((previous: MultiCriteriaForm) => {
              const newMultiCriteriaData = {
                ...previous,
                groups: [
                  ...previous.groups,
                  {
                    name: `Group ${previous.groups.length + 1}`,
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

      <Divider sx={{ mb: '20px' }} />

      <Box
        sx={{
          display: 'flex',
          mt: '5px',
          flexWrap: 'wrap',
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
                mb: '8px',
                justifyContent: 'space-around',
              }}
            >
              <Tooltip title={`Groups details: ${JSON.stringify(group)}`}>
                <Groups color={'primary'} />
              </Tooltip>
              {/* <FormLabel>Group {index + 1}</FormLabel> */}
              <TextField
                label={`Group ${index + 1}`}
                sx={{ width: '40%' }}
                value={
                  multiCriteriaForm.groups.find((el) => group.name == el.name)
                    ?.name
                }
                size='small'
                onChange={(e) => {
                  formData.multiCriteriaForm.groups =
                    formData.multiCriteriaForm.groups.map((el) => {
                      if (el.name == group.name) el.name = e.target.value;
                      return el;
                    });

                  setMultiCriteriaForm((previous: MultiCriteriaForm) => {
                    const newMultiCriteriaData = {
                      ...previous,
                      groups: formData.multiCriteriaForm.groups,
                    };
                    return newMultiCriteriaData;
                  });
                }}
              ></TextField>
              <FormControl size='small' sx={{ width: '20%' }}>
                <InputLabel htmlFor='outlined-adornment-latitude'>
                  Weight
                </InputLabel>
                <OutlinedInput
                  type='number'
                  size='small'
                  id='outlined-adornment-name'
                  label='weight'
                  value={
                    multiCriteriaForm.groups.find((el) => group.name == el.name)
                      ?.weight
                  }
                  onChange={(e) => {
                    formData.multiCriteriaForm.groups =
                      formData.multiCriteriaForm.groups.map((el) => {
                        if (el.name == group.name) el.weight = +e.target.value;
                        return el;
                      });

                    setMultiCriteriaForm((previous: MultiCriteriaForm) => {
                      const newMultiCriteriaData = {
                        ...previous,
                        groups: formData.multiCriteriaForm.groups,
                      };
                      return newMultiCriteriaData;
                    });
                  }}
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
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiCriteriaForm;
