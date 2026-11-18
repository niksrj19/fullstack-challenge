import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate, useParams } from 'react-router-dom';

import { useCar } from '../../../../hooks/useCar';

import {CarDetailsPage} from '../../components/CarDetailsPage/CarDetailsPage'



const CarPage = () => {

const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();
 const {
    car,
    loading,
    error,
  } = useCar(id);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }


  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">
          Failed to load car details: {error.message}
        </Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/carHomePage')}
          sx={{ mt: 2 }}
        >
          Back to Cars
        </Button>
      </Container>
    );
  }

   if (!car) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          Car not found.
        </Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/carHomePage')}
          sx={{ mt: 2 }}
        >
          Back to Cars
        </Button>
      </Container>
    );
  }

    return (

      <Container maxWidth="lg" sx={{ py: 4 }}>
         <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/carHomePage')}
        sx={{ mb: 3 }}
      >
        Back to Cars
      </Button>

       <Typography variant="h4" fontWeight={700} mb={3}>
        Car Details
      </Typography>

       <CarDetailsPage car={car} />
      </Container>
    )


}  

export default CarPage;

