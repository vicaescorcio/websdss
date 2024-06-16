export type GroupCriteria = {
  name: string;
  weight: number;
  incomeRange: number[];
  ageRange: number[];
  gender: string;
  educationLevel?: string;
};
export type MultiCriteriaForm = {
  groups: GroupCriteria[];
  incomeRange: number[];
  ageRange: number[];
  gender: string;
};
