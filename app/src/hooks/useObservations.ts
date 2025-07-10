import { useEffect, useState } from 'react';
import type { Observations } from '../types/observation.types';

type ObservationDto = {
  id: string;
  code: string;
  value: number;
  unit: string;
};

type MeasurementDto = {
  id: string;
  date: Date;
  type: string;
  observations: ObservationDto[];
};

type MeasurementsDto = {
  data: MeasurementDto[];
  limit: number;
  page: number;
  total: number;
};

const mapMeasurementsToObservations = (
  data: MeasurementDto[]
): { observations: Observations[]; dates: Date[] } => {
  return data.reduce(
    (acc: { observations: Observations[]; dates: Date[] }, measurement) => {
      if (!acc.dates.includes(measurement.date)) {
        acc.dates.push(new Date(measurement.date));
      }

      measurement.observations.forEach((measurementObservation) => {
        const foundObservation = acc.observations.find(
          (observation) => observation.code === measurementObservation.code
        );
        if (!foundObservation) {
          acc.observations.push({
            code: measurementObservation.code,
            data: [
              {
                date: new Date(measurement.date),
                value: measurementObservation.value,
                unit: measurementObservation.unit,
              },
            ],
          });
        } else {
          foundObservation.data.push({
            date: new Date(measurement.date),
            value: measurementObservation.value,
            unit: measurementObservation.unit,
          });
        }
      });

      return acc;
    },
    { observations: [], dates: [] }
  );
};

const useObservations = () => {
  const [data, setData] = useState<{
    observations: Observations[];
    dates: Date[];
  }>({ observations: [], dates: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/measurements?limit=10&page=1'
        );
        if (!response.ok) {
          throw new Error('Error while fetching');
        }
        const result: MeasurementsDto = await response.json();
        setData(mapMeasurementsToObservations(result.data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, data };
};

export default useObservations;
