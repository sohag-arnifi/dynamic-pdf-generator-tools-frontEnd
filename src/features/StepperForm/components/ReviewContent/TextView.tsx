import { Box, Typography } from "@mui/material";

const TextView = ({
  label,
  fieldValue,
}: {
  label: string;
  fieldValue: string;
}) => {
  return (
    <Box>
      <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
      {fieldValue}
    </Box>
  );
};

export default TextView;
