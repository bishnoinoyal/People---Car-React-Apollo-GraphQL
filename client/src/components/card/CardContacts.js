import { useState } from 'react';
import { Card, List, Button } from 'antd';
import RemoveContact from '../buttons/RemoveContact';
import ContactUpdate from '../forms/ContactUpdate';
import { EditOutlined } from '@ant-design/icons';
import CardCar from './CardCar';
import { Link } from 'react-router-dom';

const CardContact = ({ id, firstName, lastName, cars }) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <ContactUpdate
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} />,
          ]}
        >
          <p>{firstName} {lastName}</p>
          <List
            dataSource={cars}
            renderItem={car => (
              <List.Item key={car.id}>
                <CardCar id={id} car={car} />
              </List.Item>
            )}
          />
          {cars.length > 0 && (
            <Button type="primary">
              <Link to={`/people/${id}`}>Learn more</Link>
            </Button>
          )}
        </Card>
      )}
    </>
  );
};

const getStyles = () => ({
  card: {
    width: 'auto',
    margin: '0px',
    border: '1px solid grey'
  },
});

export default CardContact;