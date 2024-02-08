import { Box, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IFormFileInputProps {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
}

const FormFileInput = ({
  name,
  placeholder,
  label,
}: // required,
IFormFileInputProps) => {
  const { control } = useFormContext();

  return (
    <Box width={"100%"}>
      <InputLabel sx={{ marginBottom: "16px" }}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <input
              id={`file-upload-${name}`}
              style={{
                width: "100%",
                border: "1px solid black",
                padding: "20px",
              }}
              {...field}
              type={"file"}
              accept="image/*"
              value={""}
              placeholder={placeholder}
              name={name}
              onChange={(e) => {
                const file = e.target.files?.length && e.target?.files[0];

                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    field.onChange(reader.result);
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default FormFileInput;
