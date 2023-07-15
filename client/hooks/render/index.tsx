import Text from "@/components/FieldTypes/Text";
import LongText from "@/components/FieldTypes/LongText";
import Image from "@/components/FieldTypes/Image";
import ImageText from "@/components/FieldTypes/ImageText";
import { UseFormReturnType } from "@mantine/form";
import { Field } from "@/interfaces/Field";

export default function useFieldsRender() {
  const render = (data2process: Field[], form: UseFormReturnType<any>) => {
    return data2process.map((item, index) => {
      const textFieldProps = {
        key: index,
        form,
        label: item.label,
        fieldId: item.field_id,
        required: item.required,
        disabled: item.disabled,
      };
      switch (item.type) {
        case "text":
          return <Text {...textFieldProps} />;
        case "long_text":
          return <LongText {...textFieldProps} />;
        case "image":
          return <Image alt={`attch_${index}`} key={index} src={item.value} />;
        case "image_text":
          return (
            <ImageText
              src={item.value}
              alt={`atch_${index}`}
              key={index}
              fieldId={item.field_id}
              form={form}
              isUseEditor={item.isUseEditor}
              label={item.label}
              required={item.required}
            />
          );
        default:
          return;
      }
    });
  };

  return { render };
}
