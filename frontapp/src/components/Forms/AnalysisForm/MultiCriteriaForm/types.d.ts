export type GroupCriteria = {
  name: string;
  weight: number;
  incomeRange: number[];
  ageRange: number[];
  criteriaType: 'max' | 'min';
  ageLevel: string[];
};
export type MultiCriteriaForm = {
  groups: GroupCriteria[];
  incomeRange: number[];
  gender: string;
  weight: number;
  criteriaType: 'max' | 'min';
  ageLevel: string[];
};
