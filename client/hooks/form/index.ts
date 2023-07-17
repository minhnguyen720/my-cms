import { Field } from "@/interfaces/Project";
import { useForm } from "@mantine/form";

export default function useFieldsControl(rawData: Field[]) {
  const initialValues = rawData.reduce((prev, curr) => {
    prev[curr.field_id] = curr.value;
    return prev;
  }, {});

  const form = useForm({
    initialValues: { ...initialValues },
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return {form, handleSubmit}
}
