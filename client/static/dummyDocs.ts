import { Project, Document } from "@/interfaces/Project";

export const dummyProject: Project[] = [
  {
    id: "chmp",
    createdDate: new Date(),
    updatedDate: new Date(),
    superAdminId: "admin",
    name: "League Of Legends",
    createdUser: "admin",
    updatedUser: "admin",
    pages: [
      {
        id: "1",
        name: "home",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
      {
        id: "2",
        name: "champions",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
      {
        id: "3",
        name: "about",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
    ],
  },
  {
    id: "clgh",
    createdDate: new Date(),
    updatedDate: new Date(),
    superAdminId: "admin",
    name: "Cyberlogitec Vietname Homepage",
    createdUser: "admin",
    updatedUser: "admin",
    pages: [
      {
        id: "1",
        name: "About",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
      {
        id: "2",
        name: "Contact us",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
      {
        id: "3",
        name: "Career",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUser: "admin",
        updatedUser: "admin",
      },
    ],
  },
];

export const projectStructure: Document = {
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
      disabled: false,
      required: true,
    },
    {
      type: "text",
      field_id: "champ_name_input",
      label: "Champion name",
      value: "Garen",
      disabled: false,
      required: true,
    },
    {
      type: "text",
      field_id: "role_name_input",
      label: "Role",
      value: "Fighter",
      disabled: false,
      required: true,
    },
    {
      type: "long_text",
      field_id: "desc_long_text",
      label: "Champion description",
      required: false,
      disabled: false,
      value:
        "<p>Born into the noble Crownguard family, along with his younger sister Lux, Garen knew from an early age that he would be expected to defend the throne of Demacia with his life. His father, Pieter, was a decorated military officer, while his aunt Tianna was Sword-Captain of the elite Dauntless Vanguard—and both were recognized and greatly respected by King Jarvan III. It was assumed that Garen would eventually come to serve the king’s son in the same manner.</p><p>The kingdom of Demacia had risen from the ashes of the Rune Wars, and the centuries afterward were plagued with further conflict and strife. One of Garen’s uncles, a ranger-knight in the Demacian military, told young Garen and Lux his tales of venturing outside the kingdom’s walls to protect its people from the dangers of the world beyond.</p>",
    },
  ],
};
