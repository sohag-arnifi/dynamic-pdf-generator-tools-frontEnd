import { Box, Card, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import { stepFields } from "../../../../utils/constants/formSteps";

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
  console.log(formValues);

  return (
    <Box marginY={"50px"} sx={{ minHeight: "60vh" }}>
      {docSteps?.map((step, i) => {
        const stepValue = formValues[step?.id];

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

            {stepValue &&
              Object?.keys(stepValue).length > 0 &&
              Object?.keys(stepValue)?.map((key) => {
                const stepField = stepFields.find(
                  (field) => field.name === key
                );
                return (
                  <Box key={key} display={"flex"} marginY={"20px"}>
                    <Typography sx={{ width: "150px" }}>
                      {stepField?.label}:{" "}
                    </Typography>
                    <Typography sx={{ marginLeft: "10px" }}>
                      {stepValue[key]}
                    </Typography>
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
