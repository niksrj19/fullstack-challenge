//create a car details page id will come from query params and fetch the car details from the api and display it on the page
import {GET_CAR} from "@/features/cars/services/car.service";
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Car } from "@/types/car.types";

interface CarDetailsPageProps {
  car: Car;
}


export const CarDetailsPage = ({car} : CarDetailsPageProps) => {
     const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

     const isTablet = useMediaQuery(
    theme.breakpoints.between('sm', 'md')
  );


     const carImage = isMobile
    ? car.mobile
    : isTablet
      ? car.tablet
      : car.desktop;
    return (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
             {carImage ? (
        <CardMedia
          component="img"
          image={carImage}
          alt={`${car.make} ${car.model}`}
          sx={{
            height: { xs: 240, sm: 350, md: 450 },
            objectFit: 'cover',
          }}
        />
         ) : (
        <Box
          sx={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
          }}
        >
          <DirectionsCarIcon
            sx={{ fontSize: 100, color: 'text.secondary' }}
          />
        </Box>
          )}
           <CardContent sx={{ p: { xs: 2, md: 4 } }}>

            <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
            <Box>
            <Typography variant="h4" fontWeight={700}>
              {car.make} {car.model}
            </Typography>

            <Typography color="text.secondary">
              Model year: {car.year}
            </Typography>
          </Box>
           <Chip
            label="Car Details"
            color="primary"
          />
        </Stack>
          <Divider sx={{ my: 3 }} />
           <Typography variant="h6" fontWeight={700} mb={2}>
          Specifications
        </Typography>
         <Grid container spacing={2}>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Make
              </Typography>

              <Typography fontWeight={600}>
                {car.make}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Model
              </Typography>

              <Typography fontWeight={600}>
                {car.model}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Manufacturing Year
              </Typography>

              <Typography fontWeight={600}>
                {car.year}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Color
              </Typography>

              <Typography fontWeight={600}>
                {car.color}
              </Typography>
            </Box>
          </Grid>

        </Grid>

           </CardContent>
        </Card>
    )
}