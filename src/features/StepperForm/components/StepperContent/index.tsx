import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import {
  stepInputFields,
  stepperFields,
  stepsHeaders,
} from "../../../../utils/constants/formSteps";
import FormTextInput from "../Forms/FormTextInput";
import { useEffect, useState } from "react";
import FormSelectField from "../Forms/FormSelectField";
import FormRadioField from "../Forms/FormRadioField";
import FormDateInput from "../Forms/FormDateInput";
import FormFileInput from "../Forms/FormFileInput";

const StepperContent = ({
  activeStep,
}: {
  activeStep: { id: number; docId: number; objName: string; label: string };
}) => {
  const [loading, setLoading] = useState(false);

  const headerContent = stepsHeaders.filter(
    (content) =>
      content.stepId === activeStep.id && content.docId === activeStep.docId
  );

  const stepContent = stepperFields.filter(
    (content) =>
      content.stepId === activeStep.id && content.docId === activeStep.docId
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeStep]);

  if (loading) {
    return (
      <Box
        marginY={"50px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ minHeight: "60vh" }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box marginY={"50px"} sx={{ minHeight: "60vh" }}>
      <Box marginY={"20px"}>
        {headerContent?.map((content) => {
          const { id, heading, subHeading } = content;
          return (
            <Box key={id} sx={{ paddingX: "20px" }}>
              <Typography
                gutterBottom
                variant="h4"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {heading}
              </Typography>

              {subHeading?.map((sub, i) => (
                <Typography
                  key={i}
                  gutterBottom
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  {sub}
                </Typography>
              ))}
            </Box>
          );
        })}
      </Box>

      {stepContent.length > 0 ? (
        <Card sx={{ marginX: "20px", padding: "20px" }} variant="outlined">
          {stepContent?.map((content, i) => {
            const { id, label } = content;

            const inputFields = stepInputFields.filter(
              (field) => field.fieldId === id
            );

            return (
              <Box marginBottom={"50px"} sx={{ paddingX: "20px" }} key={i}>
                {label && <Divider textAlign="left">{label}</Divider>}
                <Grid marginY={"20px"} container spacing={2}>
                  {inputFields?.map((inputField, i) => {
                    const {
                      name,
                      label,
                      placeholder,
                      type,
                      required,
                      valueOptions,
                      width,
                    } = inputField;

                    return type === "text" ||
                      type === "email" ||
                      type === "number" ? (
                      <Grid key={i} item xs={width ?? 4}>
                        <FormTextInput
                          name={`${activeStep.label}.${name}`}
                          type={type}
                          placeholder={placeholder || ""}
                          label={label}
                          required={required}
                        />
                      </Grid>
                    ) : type === "select" ? (
                      <Grid key={i} item xs={width ?? 4}>
                        <FormSelectField
                          name={`${activeStep.label}.${name}`}
                          placeholder={placeholder || ""}
                          label={label}
                          required={required}
                          valueOptions={valueOptions || []}
                        />
                      </Grid>
                    ) : type === "radio" ? (
                      <Grid key={i} item xs={width ?? 4}>
                        <FormRadioField
                          name={`${activeStep.label}.${name}`}
                          label={label}
                          required={required}
                          valueOptions={valueOptions || []}
                        />
                      </Grid>
                    ) : type === "date" ? (
                      <Grid key={i} item xs={width ?? 4}>
                        <FormDateInput
                          name={`${activeStep.label}.${name}`}
                          type={type}
                          placeholder={placeholder || ""}
                          label={label}
                          required={required}
                        />
                      </Grid>
                    ) : type === "file" ? (
                      <Grid key={i} item xs={width ?? 4}>
                        <FormFileInput
                          name={`${activeStep.label}.${name}`}
                          placeholder={placeholder || ""}
                          label={label}
                          required={required}
                        />
                      </Grid>
                    ) : null;
                  })}
                </Grid>
              </Box>
            );
          })}
        </Card>
      ) : (
        <Box
          marginY={"50px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ minHeight: "40vh" }}
        >
          <Typography variant="h4">No Input Fields</Typography>
        </Box>
      )}

      {/* {stepInputFields?.length ? (
        <Card
          variant="outlined"
          sx={{
            marginX: "20px",
            padding: "20px",
          }}
        >
          {stepInputFields?.map((field, i) => {
            const { name, label, placeholder, type, required } = field;

            if (type === "text" || type === "email" || type === "number") {
              return (
                <Box sx={{ marginBottom: "20px" }} key={i}>
                  <FormTextInput
                    name={`${activeStepId}.${name}`}
                    type={type}
                    placeholder={placeholder}
                    label={label}
                    required={required}
                  />
                </Box>
              );
            }
          })}
        </Card>
      ) : (
        <Box
          marginY={"50px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ minHeight: "40vh" }}
        >
          <Typography variant="h4">No Input Fields</Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default StepperContent;
