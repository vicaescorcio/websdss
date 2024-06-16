import { LocationForm } from './LocationsForm/types.d.ts';
import { AccessibilityForm } from './AccessibilityForm/types.d.ts';
import { MultiCriteriaForm } from './MultiCriteriaForm/types.d.ts';

export type AnalysisForm = {
  locationForm: LocationForm;
  accessibilityForm: AccessibilityForm;
  multiCriteriaForm: MultiCriteriaForm;
};
