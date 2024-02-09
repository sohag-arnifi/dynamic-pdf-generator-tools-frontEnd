import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
  label,
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id={name}>{label}</InputLabel>

              <Select
                id={name}
                label={label}
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
            </FormControl>
          );
        }}
      />
    </Box>
  );
};

export default FormSelectField;
