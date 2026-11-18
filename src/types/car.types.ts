import { SeedCar } from "../mocks/seed";

export type Car =  SeedCar;


export type CreateCarInput = Omit<Car, "id">;

export type SortField = "make" | "model" | "year";
export type SortDirection = "asc" | "desc";

