import useFieldsControl from "@/hooks/form";
import { projectStructure } from "@/static/dummyDocs";
import {
  Box,
  Stack,
  Switch,
  Affix,
  rem,
  Transition,
  ActionIcon,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import React, { useState } from "react";
import FormContainer from "../FormContainer";
import Form from "@/components/Form";

const Doc = () => {
  const { form, handleSubmit } = useFieldsControl(projectStructure.data);
  const [checked, setChecked] = useState(true);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Box pt={"1rem"} pb={"2rem"} px={"1.5rem"}>
      <Stack spacing={"xl"}>
        <Switch
          label="Active"
          color="green"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <>
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values);
            })}
          >
            <FormContainer>
              <Form data={projectStructure.data} form={form} />
            </FormContainer>
          </form>
        </>
      </Stack>
      <Affix position={{ bottom: rem(12), right: rem(12) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              color="cyan"
              variant="filled"
              radius={"xl"}
              size={"lg"}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp size="1rem" />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </Box>
  );
};

export default Doc;
