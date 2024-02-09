import { BeautifulMentionsPlugin } from "lexical-beautiful-mentions";
import {
  formSteps,
  stepInputFields,
  stepperFields,
} from "../../../utils/constants/formSteps";

const MentionsVarible = ({ docId }: { docId: number }) => {
  const variableKeys: string[] = [];

  formSteps.forEach((step) => {
    if (step.docId === docId) {
      const stepFields = stepperFields.filter(
        (field) => field.stepId === step.id && docId === step.docId
      );

      stepFields.forEach((field) => {
        if (field.docId === docId && field.stepId === step.id) {
          const fieldInputs = stepInputFields.filter(
            (input) => input.fieldId === field.id
          );

          fieldInputs.map((input) => {
            variableKeys.push(`{{${step.label}.${input.name}}}`);
          });
        }
      });
    }
  });

  const mentionItems = {
    "@": variableKeys,
    "#": ["Anton", "Boris", "Catherine", "Dmitri", "Elena", "Felix", "Gina"],
  };

  return <BeautifulMentionsPlugin items={mentionItems} menuItemLimit={50} />;
};

export default MentionsVarible;
