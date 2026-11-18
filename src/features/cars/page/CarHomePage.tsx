import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useCars } from "@/hooks/useCars";
import { useDebounce } from "@/hooks/useDebounce";
import { useCreateCar } from "../../../hooks/useCreateCar";
import CarFilters from "../components/CarFilter/CarFilter";
import { CarForm } from "../components/CarForm/CarForm";
import CarListingPage from "../components/CarList/CarList";

import type { SortDirection, SortField } from "@/types/car.types";

export default function CarsHomePage() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

  const debouncedSearch = useDebounce<string>(search, 500);
  const debouncedYear = useDebounce<string>(year, 500);

  const [sortBy, setSortBy] = useState<SortField>("make");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [openAddCar, setOpenAddCar] = useState(false);

  const { cars, loading, error } = useCars({
    model: debouncedSearch,
    year: debouncedYear ? Number(debouncedYear) : undefined,
    sortBy,
    direction,
  });

  const {
    createCar,
    loading: creating,
    error: createError,
  } = useCreateCar(debouncedSearch);

  const handleSortChange = (
    field: SortField,
    direct: SortDirection
  ) => {
    setSortBy(field);
    setDirection(direct);
  };

  const handleClose = () => {
    if (!creating) {
      setOpenAddCar(false);
    }
  };

  const handleAddCar = async (
    input: Parameters<typeof createCar>[0]
  ) => {
    await createCar(input);
    setOpenAddCar(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="flex-start"
      >
        <Box
          sx={{
            width: { xs: "100%", md: 220 },
            flexShrink: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              position: { md: "sticky" },
              top: 24,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Car Management
            </Typography>

            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddCar(true)}
              sx={{
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add Car
            </Button>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Search & Filters
            </Typography>

            <CarFilters
              search={search}
              onSearchChange={setSearch}
              year={year}
              onYearChange={setYear}
              sortBy={sortBy}
              direction={direction}
              onSortChange={handleSortChange}
            />
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h6" fontWeight={700}>
                Available Cars
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {cars.length} Cars
              </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <CarListingPage
              cars={cars}
              loading={loading}
              error={error}
            />
          </Paper>
        </Box>
      </Stack>

      <Dialog
        open={openAddCar}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={700}>
            Add New Car
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Enter car details to add it to your inventory.
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <CarForm
            onSubmit={handleAddCar}
            submitting={creating}
            serverError={createError?.message}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}