import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";
import Title from "../layout/Title";

const ContactAdd = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addContact] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    addContact({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson: newPerson } }) => {
        const existingData = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: [...existingData.people, newPerson],
          },
        });
      },
    });
  };

  return (
    <>
      <Title text="Add Person" />
      <Form
        name="add-contact-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          label="First Name: "
          rules={[{ required: true, message: "Please enter First Name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name: "
          rules={[{ required: true, message: "Please enter Last Name" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Contact
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default ContactAdd;
