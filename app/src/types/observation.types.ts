type Observation = {
  date: Date;
  value: number;
  unit: string;
};

export type Observations = {
  code: string;
  data: Observation[];
};
