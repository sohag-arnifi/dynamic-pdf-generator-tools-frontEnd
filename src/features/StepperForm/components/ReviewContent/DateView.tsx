import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const DateView = ({
  label,
  fieldValue,
}: {
  label: string;
  fieldValue: string;
}) => {
  return (
    <Box>
      <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
      {dayjs(fieldValue).format("DD/MM/YYYY")}
    </Box>
  );
};

export default DateView;
