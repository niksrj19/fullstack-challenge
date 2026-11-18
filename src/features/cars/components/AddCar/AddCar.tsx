import { useState, type FormEvent } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useCreateCar } from '@/hooks/useCreateCar';

import type { CreateCarInput } from '@/types/car.types'

const initialForm: CreateCarInput = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  color: '',
  mobile: '',
  tablet: '',
  desktop: '',
};

const  AddCar = () => {

    const [form, setForm] = useState<CreateCarInput>(initialForm);
    const [successMessage, setSuccessMessage] = useState('');
    const { createCar, loading, error } = useCreateCar();

    const handleChange = (field: keyof CreateCarInput, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: field === 'year' ? Number(value) : value,
    }));
  };

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    try {
      const createdCar = await createCar(form);

      if (createdCar) {
        setSuccessMessage(
          `${createdCar.make} ${createdCar.model} created successfully!`,
        );
        setForm(initialForm);
      }
    } catch {
      // Apollo exposes the mutation error through the hook's error state.
    }
  };


  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Add New Car
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Make"
            value={form.make}
            onChange={(event) => handleChange('make', event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Model"
            value={form.model}
            onChange={(event) => handleChange('model', event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Year"
            type="number"
            value={form.year}
            onChange={(event) => handleChange('year', event.target.value)}
            fullWidth
          />

          <TextField
            label="Color"
            value={form.color}
            onChange={(event) => handleChange('color', event.target.value)}
            fullWidth
          />

          <TextField
            label="Mobile Image URL"
            value={form.mobile}
            onChange={(event) => handleChange('mobile', event.target.value)}
            fullWidth
          />

          <TextField
            label="Tablet Image URL"
            value={form.tablet}
            onChange={(event) => handleChange('tablet', event.target.value)}
            fullWidth
          />

          <TextField
            label="Desktop Image URL"
            value={form.desktop}
            onChange={(event) => handleChange('desktop', event.target.value)}
            fullWidth
          />

          {error && (
            <Alert severity="error">
              {error.message}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success">
              {successMessage}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !form.make.trim() || !form.model.trim()}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              'Create Car'
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};


export default AddCar;