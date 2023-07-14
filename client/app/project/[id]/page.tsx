"use client";
import { Document } from "@/interfaces/Field";
import { Box, Button, Group, Stack, Switch } from "@mantine/core";
import { useState } from "react";
import useFieldsRender from "@/hooks/render";
import useFieldsControl from "@/hooks/form";

interface props {
  params: {
    id: string;
  };
}

const projectStructure: Document = {
  id: "dummy_project",
  name: "LoL Champions",
  createdDate: new Date(),
  updatedDate: new Date(),
  createdUser: "admin",
  updatedUser: "admin",
  fields: 3,
  active: true,
  data: [
    {
      type: "image",
      field_id: "champ_avatar",
      value:
        "https://i.pinimg.com/564x/e9/1f/eb/e91feb6ae1ddd2e29adf64d12d2241dd.jpg",
    },
    {
      type: "text",
      field_id: "champ_name_input",
      label: "Champion name",
      value: "Garen",
    },
    {
      type: "text",
      field_id: "role_name_input",
      label: "Role",
      value: "Fighter",
      required: false,
    },
    {
      type: "long_text",
      field_id: "desc_long_text",
      label: "Champion description",
      value:
        "<p>Born into the noble Crownguard family, along with his younger sister Lux, Garen knew from an early age that he would be expected to defend the throne of Demacia with his life. His father, Pieter, was a decorated military officer, while his aunt Tianna was Sword-Captain of the elite Dauntless Vanguard—and both were recognized and greatly respected by King Jarvan III. It was assumed that Garen would eventually come to serve the king’s son in the same manner.</p><p>The kingdom of Demacia had risen from the ashes of the Rune Wars, and the centuries afterward were plagued with further conflict and strife. One of Garen’s uncles, a ranger-knight in the Demacian military, told young Garen and Lux his tales of venturing outside the kingdom’s walls to protect its people from the dangers of the world beyond.</p>",
    },
  ],
};

function ProjectOverall({ params: { id } }: props) {
  const { form, handleSubmit } = useFieldsControl(projectStructure.data);
  const { render } = useFieldsRender();
  const [checked, setChecked] = useState(true);

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
            {render(projectStructure.data, form)}
            <Group position="right">
              <Button type="submit">Save</Button>
              <Button color="red">Cancel</Button>
            </Group>
          </form>
        </>
      </Stack>
    </Box>
  );
}

export default ProjectOverall;
