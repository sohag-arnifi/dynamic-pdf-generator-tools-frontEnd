import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IFormTextInputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
}

const FormTextInput = ({
  name,
  placeholder,
  label,
  type,
  required,
}: IFormTextInputProps) => {
  const { control } = useFormContext();

  return (
    <Box width={"100%"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <TextField
              sx={{
                width: "100%",
              }}
              {...field}
              type={type}
              value={field.value || ""}
              label={label}
              variant="outlined"
              placeholder={placeholder}
              required={required}
              name={name}
            />
          );
        }}
      />
    </Box>
  );
};

export default FormTextInput;
