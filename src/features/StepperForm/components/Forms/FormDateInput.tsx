import { Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface IFormDateInputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
}

const FormDateInput = ({ name, label }: IFormDateInputProps) => {
  const { control } = useFormContext();

  return (
    <Box width={"100%"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  {...field}
                  label={label}
                  value={dayjs(field.value)}
                  onChange={field.onChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          );
        }}
      />
    </Box>
  );
};

export default FormDateInput;
