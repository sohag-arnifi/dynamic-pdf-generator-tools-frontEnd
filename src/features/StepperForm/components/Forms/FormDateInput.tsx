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
    <Box marginTop={"-8px"} minWidth={"270px"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  sx={{ width: "100%" }}
                  views={["day", "month", "year"]}
                  format="DD/MM/YYYY"
                  {...field}
                  label={label}
                  value={field.value ? dayjs(field.value) : null}
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
