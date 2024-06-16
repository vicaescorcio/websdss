'use server';

export type AnalysisFormState = {
  locations: any[];
  accessibility: {
    mode: string;
    distance: number;
  };
  criteria: any[];
};
export const startAnalysis = async (
  prevState: AnalysisFormState,
  formData: FormData
): Promise<AnalysisFormState> => {
  console.log(formData);
  return {
    locations: [],
    accessibility: {
      mode: 'walking',
      distance: 1000,
    },
    criteria: [],
  } as AnalysisFormState;
};
