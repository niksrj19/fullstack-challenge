
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import type {
  Car,
  SortDirection,
  SortField,
} from "@/types/car.types";

import {
  GET_CARS,
  type GetCarsData,
  type GetCarsVars,
} from "../features/cars/services/car.service";

type UseCarsOptions = {
  model?: string;
  year?: number;
  sortBy?: SortField;
  direction?: SortDirection;
};

function sortCars(
  cars: Car[],
  sortBy: SortField,
  direction: SortDirection
) {
  const sorted = [...cars].sort((a, b) => {
    const left = a[sortBy];
    const right = b[sortBy];

    if (typeof left === "number" && typeof right === "number") {
      return left - right;
    }

    return String(left).localeCompare(String(right));
  });

  return direction === "desc" ? sorted.reverse() : sorted;
}

export function useCars({
  model,
  year,
  sortBy = "make",
  direction = "asc",
}: UseCarsOptions = {}) {

  const variables = useMemo<GetCarsVars>(() => {
    const trimmedModel = model?.trim();

    return {
      ...(trimmedModel ? { model: trimmedModel } : {}),
      ...(year ? { year } : {}),
    };
  }, [model, year]);

  const { data, loading, error, refetch } = useQuery<
    GetCarsData,
    GetCarsVars
  >(GET_CARS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const cars = useMemo(
    () => sortCars(data?.cars ?? [], sortBy, direction),
    [data, sortBy, direction]
  );

  return {
    cars,
    loading,
    error,
    refetch,
  };
}
