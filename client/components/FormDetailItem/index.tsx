"use client";

import Text from "@/components/Fields/FieldTypes/Text";
import LongText from "@/components/Fields/FieldTypes/LongText";
import { Affix, Button, Stack, Transition, rem } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import UpdatableImage from "../UpdatableImage";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { FieldHandler } from "../Fields/hooks/useFields";

interface Props {
  fieldHandler: FieldHandler;
  form: UseFormReturnType<any>;
}

const FormDetailItem: React.FC<Props> = ({ fieldHandler, form }) => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Stack spacing="lg">
        {fieldHandler.getFields().map((item) => {
          const textFieldProps = {
            form,
            id: item._id,
            label: `${item.label} (fieldId: ${item.fieldId})`,
            fieldId: item.fieldId,
            required: item.required,
            active: item.active,
            fieldHandler: fieldHandler,
            value: item.value ? item.value : "",
          };
          switch (item.type) {
            case "shortText":
              return <Text {...textFieldProps} key={item._id} />;
            case "longText":
              return <LongText {...textFieldProps} key={item._id} />;
            case "image":
              return (
                <UpdatableImage
                  id={item._id}
                  key={item._id}
                  alt={`atch_${item._id}`}
                  src={item.value}
                  label={`${item.label} (fieldId: ${item.fieldId})`}
                  fieldId={item.fieldId}
                  fieldHandler={fieldHandler}
                  required={item.required}
                  active={item.active}
                  docId={item.doc}
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
              return;
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
