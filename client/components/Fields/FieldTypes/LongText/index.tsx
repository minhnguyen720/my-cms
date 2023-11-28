"use client";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { UseFormReturnType } from "@mantine/form";
import { Input, Text } from "@mantine/core";
import Config from "../../Config";

interface Props {
  label?: string;
  form?: UseFormReturnType<any>;
  fieldId?: string;
  required?: boolean;
  active?: boolean;
  fieldHandler?: any;
  value?: any;
  id?: string;
}

const LongText: React.FC<Props> = ({
  id,
  form,
  label,
  fieldId,
  required,
  active,
  fieldHandler,
  value,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate(props) {
      if (form && id) form.setFieldValue(id, props.editor.getHTML());
    },
  });

  return (
    <>
      {form && id && (
        <div className="form_item flex">
          <Input.Wrapper
            className="basis-[90%]"
            withAsterisk={required}
            label={label}
            {...form.getInputProps(id)}
          >
            {active ? (
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
            ) : (
              <Text>Editor is disabled</Text>
            )}
          </Input.Wrapper>
          <div className="ml-3 flex items-center">
            <Config
              required={required}
              active={active}
              fieldId={fieldId}
              id={id}
              fieldHandler={fieldHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LongText;
