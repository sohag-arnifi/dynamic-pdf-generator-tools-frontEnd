import { useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface IFormProps {
  children: React.ReactNode;
  submitHandler: SubmitHandler<Record<string, FieldValues>>;
}

const Form = ({ children, submitHandler }: IFormProps) => {
  const [defaultValues] = useState(() => {
    const storedFormData = localStorage.getItem("form-data");
    return JSON.parse(storedFormData || "{}") || {};
  });

  const formConfig: Record<string, FieldValues> = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const fillFormData = methods.watch();
  const formsData = { ...fillFormData };
  const { handleSubmit } = methods;

  useEffect(() => {
    localStorage.setItem("form-data", JSON.stringify(formsData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillFormData]);

  const onSubmit: SubmitHandler<Record<string, FieldValues>> = (data) => {
    submitHandler(data);
    // reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
