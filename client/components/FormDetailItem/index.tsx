"use client";

import Text from "@/components/FieldTypes/Text";
import LongText from "@/components/FieldTypes/LongText";
import Image from "@/components/FieldTypes/Image";
import ImageText from "@/components/FieldTypes/ImageText";
import { UseFormReturnType } from "@mantine/form";
import { Field } from "@/interfaces/Project";

interface Props {
  data: Field[];
  form: UseFormReturnType<any>;
}

const FormDetailItem: React.FC<Props> = ({ data, form }) => {
  return data.map((item, index) => {
    const textFieldProps = {
      form,
      label: item.label,
      fieldId: item.field_id,
      required: item.required,
      active: item.active,
    };
    switch (item.type) {
      case "text":
        return <Text {...textFieldProps} key={index}/>;
      case "long_text":
        return <LongText {...textFieldProps} key={index}/>;
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
            active={item.active}
            required={item.required}
          />
        );
      default:
        return <></>;
    }
  });
};

export default FormDetailItem;
