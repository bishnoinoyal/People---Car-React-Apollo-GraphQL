import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_PERSON, GET_PEOPLE } from '../../graphql/queries'

const ContactUpdate = props => {
  const { id, firstName, lastName } = props
  const [form] = Form.useForm() // Create form instance using useForm
  const [, forceUpdate] = useState()

  const [updateContact] = useMutation(UPDATE_PERSON)
  const { loading, error, data } = useQuery(GET_PEOPLE);

  const onFinish = values => {
    const { firstName, lastName } = values

    updateContact({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { updatePerson: updatedPerson } }) => {
        const existingData = cache.readQuery({ query: GET_PEOPLE });
        const updatedPeople = existingData.people.map(person => {
          if (person.id === updatedPerson.id) {
            return {
              ...person,
              firstName: updatedPerson.firstName,
              lastName: updatedPerson.lastName
            };
          }
          return person;
        });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: updatedPeople
          }
        });
      }
    });
    props.onButtonClick();
  }

  useEffect(() => {
    forceUpdate();
  }, [])

  return (
    <Form
      form={form} // Pass the form instance to the Form component
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please enter a first name' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default ContactUpdate