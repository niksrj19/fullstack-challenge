
import { Grid, Box, Typography } from "@mui/material";
import { ApolloError } from "@apollo/client";
import CarCard from "../CarCard/CarCard";
import { Car } from "@/types/car.types";

type CarListProps = {
  cars: Car[];
  loading: boolean;
  error?: ApolloError;
};

export default function CarListingPage({
  cars,
  loading,
  error,
}: CarListProps) {

  if (loading) {
    return (
      <Typography textAlign="center" py={5}>
        Loading cars...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" py={5}>
        Could not load cars: {error.message}
      </Typography>
    );
  }

  if (!cars.length) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6">
          No cars found
        </Typography>
        <Typography color="text.secondary">
          Try changing your search filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {cars.map((car) => (
        <Grid
          key={car.id}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
}
