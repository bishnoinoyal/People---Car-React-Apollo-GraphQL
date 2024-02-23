import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, List } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { GET_PERSON_WITH_CARS } from '../../graphql/queries'; // Import your GraphQL query

const Person = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const { person } = data;

  return (
    <div>
      <Button icon={<LeftOutlined />}>
        <Link to="/">Go back home</Link>
      </Button>
      <Card>
        <p>{person.firstName} {person.lastName}</p>
        <List
          dataSource={person.cars}
          renderItem={car => (
            <List.Item key={car.id}>
              <p>{car.year} {car.make} {car.model}</p>
              <p>Price: ${car.price}</p>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Person;