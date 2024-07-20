import { SyntheticEvent, useState } from 'react';
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
  Checkbox,
} from '@mui/material';
import { Groups, Info, RemoveCircleOutline } from '@mui/icons-material';
import style from './style.module.css';
import { AnalysisForm } from '../types';
import {
  GroupCriteria,
  MultiCriteriaForm as MultiCriteriaFormType,
} from './types.d';

const MultiCriteriaForm = ({ formData }: { formData: AnalysisForm }) => {
  const [multiCriteriaForm, setMultiCriteriaForm] =
    useState<MultiCriteriaFormType>(formData.multiCriteriaForm);

  const isChecked = (value: string) => {
    return multiCriteriaForm.ageLevel.filter((age) => age == value).length > 0
      ? true
      : false;
  };
  const handleCheckBoxChange = (event: any) => {
    const value = event.target.value;

    setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
      if (event.target.checked) {
        const newMultiCriteriaData = {
          ...previous,
          ageLevel: [event.target.value, ...previous.ageLevel],
        };
        formData.multiCriteriaForm = newMultiCriteriaData;
        return newMultiCriteriaData;
      } else {
        const newMultiCriteriaData = {
          ...previous,
          ageLevel: previous.ageLevel.filter((el) => el !== event.target.value),
        };
        formData.multiCriteriaForm = newMultiCriteriaData;
        return newMultiCriteriaData;
      }
    });
  };

  const handleChange = (e: any) => {
    setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
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
          <Tooltip title='Range of per capita income of individuals of the group.'>
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
      <FormControl>
        <FormLabel
          id='radio-ageLevel-label'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Tooltip title='Age range of inviduals of the group.'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Age Level
        </FormLabel>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked('0_a_5_anos')}
                value={'0_a_5_anos'}
                onChange={handleCheckBoxChange}
              />
            }
            label='0 a 5 years'
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'6_a_10_anos'}
                checked={isChecked('6_a_10_anos')}
                onChange={handleCheckBoxChange}
              />
            }
            label='6 a 10 years'
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'11_a_14_anos'}
                checked={isChecked('11_a_14_anos')}
                onChange={handleCheckBoxChange}
              />
            }
            label='11 a 14 years'
          />
        </FormGroup>
        {/* <RadioGroup
          row
          aria-labelledby='radio-ageLevel-label'
          name='ageLevel'
          onChange={handleChange}
          sx={{ color: 'black' }}
          value={multiCriteriaForm.ageLevel}
        >
          <FormControlLabel
            value='0_a_5_anos'
            control={<Radio />}
            label='0 a 5 anos'
          />
          <FormControlLabel
            value='6_a_10_anos'
            control={<Radio />}
            label='6 a 10 anos'
          />
          <FormControlLabel
            value='11_a_14_anos'
            control={<Radio />}
            label='11 a 14 anos'
          />
        </RadioGroup> */}
      </FormControl>
      <Divider sx={{ mb: '20px' }} />
      <FormControl>
        <FormLabel
          id='radio-criteriaType-label'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Tooltip title='Determine if criteria is max or min'>
            <Info fontSize='small' color='disabled' sx={{ mr: 1 }}></Info>
          </Tooltip>
          Criteria Type
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='radio-criteria-type-label'
          name='criteriaType'
          onChange={handleChange}
          sx={{ color: 'black' }}
          value={multiCriteriaForm.criteriaType}
        >
          <FormControlLabel value='max' control={<Radio />} label='Max' />
          <FormControlLabel value='min' control={<Radio />} label='Min' />
        </RadioGroup>
      </FormControl>
      <Divider sx={{ mb: '20px' }} />

      <FormGroup className={style.formControl}>
        <Button
          onClick={(e) => {
            setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
              const newMultiCriteriaData = {
                ...previous,
                groups: [
                  ...previous.groups,
                  {
                    name: `Group ${previous.groups.length + 1}`,
                    weight: multiCriteriaForm.weight,
                    incomeRange: multiCriteriaForm.incomeRange,
                    ageLevel: multiCriteriaForm.ageLevel,
                    criteriaType: multiCriteriaForm.criteriaType,
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

                  setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
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

                    setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
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
                  setMultiCriteriaForm((previous: MultiCriteriaFormType) => {
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
