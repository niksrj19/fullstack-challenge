import { Car } from '@/types/car.types';
import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars($model: String, $year: Int) {
    cars(model: $model, year: $year) {
        id
        make
        model 
        year
        color
        mobile
        tablet
        desktop
    }
  }
`;

export const GET_CAR = gql`
  query GetCar($id: ID!) {
    car(id: $id) {
        id
        make
        model 
        year
        color
        mobile
        tablet
        desktop
    }
  }
`;

export const ADD_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export type GetCarsData = { cars: Car[] };
export type GetCarsVars = { model?: string , year?: number};