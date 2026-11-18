import { useQuery } from '@apollo/client/react';

import {GET_CAR} from "@/features/cars/services/car.service";

import type { Car } from '../types/car.types';

interface GetCarResponse {
  car: Car | null;
}


interface GetCarVariables {
  id: string;
}
export const useCar = (id: string | undefined) => {


     const {
    data,
    loading,
    error,
    refetch,
  } = useQuery<GetCarResponse, GetCarVariables>(
    GET_CAR,
    {
      variables: {
        id: id ?? '',
      },
      skip: !id,
      fetchPolicy: 'cache-first',
    }
  );

   return {
    car: data?.car ?? null,
    loading,
    error,
    refetch,
  };
};