import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IFormRadioFieldProps {
  name: string;
  label: string;
  required: boolean;
  valueOptions: string[];
}

const FormRadioField = ({
  name,
  label,
  valueOptions,
}: IFormRadioFieldProps) => {
  const { control } = useFormContext();

  return (
    <Box width={"100%"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormControl>
              <FormLabel id={name}>{label}</FormLabel>
              <RadioGroup
                row
                {...field}
                aria-labelledby={name}
                name={name}
                value={field.value}
              >
                {valueOptions.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          );
        }}
      />
    </Box>
  );
};

export default FormRadioField;
