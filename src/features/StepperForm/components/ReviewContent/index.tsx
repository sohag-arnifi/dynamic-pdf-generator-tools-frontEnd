import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import {
  stepInputFields,
  stepperFields,
} from "../../../../utils/constants/formSteps";
import DateView from "./DateView";
import ImageView from "./ImageView";
import TextView from "./TextView";

interface IReviewContentProps {
  docSteps: {
    id: number;
    docId: number;
    label: string;
  }[];
}

const ReviewContent = ({ docSteps }: IReviewContentProps) => {
  const { watch } = useFormContext();
  const formValues = watch();

  return (
    <Box marginY={"50px"} sx={{ minHeight: "60vh" }}>
      {docSteps?.map((step, i) => {
        const stepFieldValues = formValues[step.label];

        const fields = stepperFields?.filter(
          (field) => field.stepId === step.id
        );

        return (
          <Card
            key={i}
            variant="outlined"
            sx={{
              marginTop: "20px",
              marginX: "20px",
              padding: "20px",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                variant="body1"
              >
                {step?.label}
              </Typography>

              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Box>

            {fields?.length > 0 &&
              fields?.map((stepField, i) => {
                const fieldInput = stepInputFields?.filter(
                  (input) => input.fieldId === stepField.id
                );

                return (
                  <Box marginTop="16px" key={i}>
                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {stepField.label}
                    </Typography>

                    <Grid container spacing={4}>
                      {fieldInput?.map((field) => {
                        const { name, type, label } = field;

                        const fieldValue =
                          stepFieldValues[stepField.label][name];

                        return type === "radio" ? (
                          <Grid key={name} item xs={12}>
                            <TextView label={label} fieldValue={fieldValue} />
                          </Grid>
                        ) : type === "date" ? (
                          <Grid key={name} item xs={12}>
                            <DateView label={label} fieldValue={fieldValue} />
                          </Grid>
                        ) : type === "file" ? (
                          <Grid key={name} item xs={4}>
                            <ImageView label={label} fieldValue={fieldValue} />
                          </Grid>
                        ) : (
                          <Grid key={name} item xs={4}>
                            <TextView label={label} fieldValue={fieldValue} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                );
              })}
          </Card>
        );
      })}
    </Box>
  );
};

export default ReviewContent;
