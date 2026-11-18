import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import type { Car } from '../../../../types/car.types'

import { useNavigate } from 'react-router-dom';

import { CardActionArea } from '@mui/material';

import { styles } from './styles';

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
    const theme = useTheme();

     const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

     const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

      const carImage = isMobile
    ? car.mobile
    : isTablet
      ? car.tablet
      : car.desktop;


return (

    
     <Card sx={styles.card} elevation={2}>
        <CardActionArea onClick={handleCardClick}>
        {carImage ? (
            <CardMedia
                component="img"
          image={carImage}
          alt={`${car.make} ${car.model}`}
          sx={styles.image}
            />
        ) : (
            <Box sx={styles.imagePlaceholder}>
                <DirectionsCarIcon sx={{ fontSize: 65 }} />
                
              </Box>
        )}
         <CardContent sx={styles.content}>
            <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
            <Typography variant="h6" fontWeight={700}>
            {car.make} {car.model}
          </Typography>
           <Chip
            label={car.year}
            size="small"
            color="primary"
          />
        </Stack>
         <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Color: {car.color}
        </Typography>

         </CardContent>
         </CardActionArea>
     </Card>
     

    )
   
}

export default CarCard;