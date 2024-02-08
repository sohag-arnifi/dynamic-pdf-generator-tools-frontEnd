import { Box, Button, Stack, Stepper, Typography } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React from "react";
import { documents, formSteps } from "../../utils/constants/formSteps";
import StepperContent from "./components/StepperContent";
import Form from "./components/Forms";
import { FieldValues } from "react-hook-form";
import ReviewContent from "./components/ReviewContent";

const StepperForm = () => {
  const [stepperStep, setStepperStep] = React.useState(() => {
    const storedStepperStep = localStorage.getItem("active-step");
    return storedStepperStep ? parseInt(storedStepperStep) : 0;
  });

  const selectedDocId = 1;
  const selectedDoc = documents.find((doc) => doc.id === selectedDocId);
  const docSteps = formSteps.filter((step) => step.docId === selectedDocId);
  const activeStep = docSteps.find((_, i) => i === stepperStep);

  const submitHandler = (data: FieldValues) => {
    if (stepperStep !== docSteps.length) {
      localStorage.setItem("active-step", String(stepperStep + 1));
      setStepperStep(stepperStep + 1);
    }
    console.log(data);
  };

  const previewHandlar = () => {
    localStorage.setItem("active-step", String(stepperStep - 1));
    setStepperStep(stepperStep - 1);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ padding: "20px", fontWeight: "bold" }}>
        Generate PDF for {selectedDoc?.name}.
      </Typography>
      <Stepper activeStep={stepperStep} alternativeLabel>
        {docSteps.map((step) => (
          <Step key={step.id}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
        <Step key={docSteps.length}>
          <StepLabel>{"Review and Submit"}</StepLabel>
        </Step>
      </Stepper>

      <Form submitHandler={submitHandler}>
        {stepperStep === docSteps.length ? (
          <ReviewContent docSteps={docSteps} />
        ) : (
          <StepperContent
            activeStep={
              activeStep as {
                id: number;
                docId: number;
                objName: string;
                label: string;
                stepType: string;
              }
            }
          />
        )}

        <Box display={"flex"} justifyContent={"end"}>
          <Stack spacing={2} direction="row">
            <Button
              disabled={stepperStep === 0}
              onClick={previewHandlar}
              variant="contained"
            >
              Privew
            </Button>

            <Button type="submit" variant="contained">
              {stepperStep === docSteps.length ? "Submit" : "Next"}
            </Button>
          </Stack>
        </Box>
      </Form>
    </Box>
  );
};

export default StepperForm;
