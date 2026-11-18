import { useMutation } from '@apollo/client/react';
import {ADD_CAR, GET_CARS, GetCarsData, GetCarsVars} from '@/features/cars/services/car.service'
import type { Car, CreateCarInput } from '../types/car.types';


interface CreateCarResponse {
  createCar: Car;
}

interface CreateCarVariables {
  input: CreateCarInput;
}

export const useCreateCar = (currentModel: string | undefined) => {

        const [createCarMutation, { loading, error }] = useMutation<
    CreateCarResponse,
    CreateCarVariables
  >(ADD_CAR, {
    update(cache, { data }) {
      if (!data) return;
      const variables: GetCarsVars = { model: currentModel || undefined };
      cache.updateQuery<GetCarsData, GetCarsVars>(
        { query: GET_CARS, variables },
        (existing) =>
          existing ? { cars: [...existing.cars, data.createCar] } : existing
      );
    },
  });

 
    
  const createCar = async (input: CreateCarInput) => {
    const response = await createCarMutation({
      variables: { input },
    });

    return response.data?.createCar;
  };

   return {
    createCar,
    loading,
    error,
  };



}
