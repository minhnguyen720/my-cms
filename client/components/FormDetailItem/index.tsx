"use client";

import Text from "@/components/Fields/FieldTypes/Text";
import LongText from "@/components/Fields/FieldTypes/LongText";
import ImageText from "@/components/Fields/FieldTypes/ImageText";
import { Affix, Button, Stack, Transition, rem } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Field } from "@/interfaces/Project";
import UpdatableImage from "../UpdatableImage";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";

interface Props {
  data: Field[];
  form: UseFormReturnType<any>;
}

const FormDetailItem: React.FC<Props> = ({ data, form }) => {
  const [scroll, scrollTo] = useWindowScroll();
  
  return (
    <>
      <Stack spacing="lg">
        {data.map((item, index) => {
          const textFieldProps = {
            form,
            label: item.label,
            fieldId: item.field_id,
            required: item.required,
            active: item.active,
          };
          switch (item.type) {
            case "text":
              return <Text {...textFieldProps} key={index} />;
            case "long_text":
              return <LongText {...textFieldProps} key={index} />;
            case "image":
              return (
                <UpdatableImage
                  key={index}
                  alt={`attch_${index}`}
                  src={item.value}
                  label={item.label}
                />
              );
            // case "image_text":
            //   return (
            //     <ImageText
            //       src={item.value}
            //       alt={`atch_${index}`}
            //       key={index}
            //       fieldId={item.field_id}
            //       form={form}
            //       isUseEditor={item.isUseEditor}
            //       label={item.label}
            //       active={item.active}
            //       required={item.required}
            //     />
            //   );
            default:
              return <></>;
          }
        })}
      </Stack>
      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size="1rem" />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default FormDetailItem;
