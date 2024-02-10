import {
  BeautifulMentionsMenuItemProps,
  BeautifulMentionsPlugin,
} from "lexical-beautiful-mentions";
import {
  formSteps,
  stepInputFields,
  stepperFields,
} from "../../../utils/constants/formSteps";
import { forwardRef } from "react";

export const getVariableKeys = (docId: number) => {
  const variableKeys: {
    label: string;
    key: string;
    value: { key: string; value: string };
  }[] = [];
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
            variableKeys.push({
              label: `{{${step.label
                .split(" ")
                .join("")}_${input.name.toUpperCase()}}}`,
              key: `${step.label
                .split(" ")
                .join("")}_${input.name.toUpperCase()}`,
              value: { key: step.label, value: input.name },
            });
          });
        }
      });
    }
  });

  return variableKeys;
};

const MentionsVarible = ({ docId }: { docId: number }) => {
  const CustomMenuItem = forwardRef<
    HTMLLIElement,
    BeautifulMentionsMenuItemProps
  >(({ item, ...props }, ref) => {
    return (
      <li className="mention-tigger" {...props} ref={ref}>
        <span>{item.value}</span>
      </li>
    );
  });
  const mentionItems = {
    "@": getVariableKeys(docId).map((item) => item.label),
  };

  return (
    <BeautifulMentionsPlugin
      items={mentionItems}
      allowSpaces
      menuItemLimit={20}
      menuItemComponent={CustomMenuItem}
    />
  );
};

export default MentionsVarible;
