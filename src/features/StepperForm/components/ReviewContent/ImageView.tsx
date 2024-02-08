import { Box } from "@mui/material";

const ImageView = ({
  fieldValue,
  label,
}: {
  label: string;
  fieldValue: string;
}) => {
  return (
    <Box>
      <img style={{ width: "500px" }} src={fieldValue} alt={label} />
    </Box>
  );
};

export default ImageView;
