import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import InputField from '../../../fe-helper/components/FormFiekds/InputField';
import RadioGroupField from '../../../fe-helper/components/FormFiekds/RadioGroupField';
import SelectField from '../../../fe-helper/components/FormFiekds/SelectField';
import { Student } from '../../../shared/model';
import { selectCityOptions } from '../../city/reducer';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useSelector(selectCityOptions);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      //Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form Fields */}
        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />

        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />} &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
