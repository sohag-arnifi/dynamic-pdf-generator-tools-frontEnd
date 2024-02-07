import { Box, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IFormSelectFieldProps {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  valueOptions: string[];
}

const FormSelectField = ({
  name,
  placeholder,
  required,
  valueOptions,
}: IFormSelectFieldProps) => {
  const { control } = useFormContext();
  return (
    <Box width={"100%"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              sx={{
                width: "100%",
              }}
              {...field}
              required={required}
              displayEmpty
              name={name}
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputProps={{ "aria-label": "Without label" }}
              renderValue={() => {
                if (!field.value) {
                  return placeholder;
                }
                return field.value;
              }}
            >
              {valueOptions?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </Box>
  );
};

export default FormSelectField;
