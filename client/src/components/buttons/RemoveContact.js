import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries';

const RemoveContact = ({ id }) => {
  const [removeContact] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      cache.modify({
        fields: {
          people(existingPeople = []) {
            return existingPeople.filter(personRef => personRef.__ref !== `Person:${removePerson.id}`);
          },
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?');

    if (result) {
      removeContact({
        variables: {
          id,
        },
      });
    }
  };

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />;
};

export default RemoveContact;