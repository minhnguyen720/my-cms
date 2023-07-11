"use client";

import LongText from "@/components/FieldTypes/LongText";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";

interface props {
  params: {
    id: string;
  };
}

const projectStructure = {
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
      type: "text_input",
      label: "Champion name",
    },
  ],
};

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2>';

function ProjectOverall({ params: { id } }: props) {
  const form = useForm({
    initialValues: {
      long_text: content,
    },
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <LongText form={form} fieldId="long_text"/>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ProjectOverall;
