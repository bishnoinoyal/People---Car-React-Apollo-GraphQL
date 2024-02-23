import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { List } from "antd";
import CardContact from "../card/CardContacts";
import Title from "../layout/Title";


const Contacts = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Title text="Records" />
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.people.map(({ id, firstName, lastName, cars }) => (
          <List.Item key={id}>
            <CardContact
              id={id}
              firstName={firstName}
              lastName={lastName}
              cars={cars}
            />
          </List.Item>
        ))}
      </List>
    </>
  );
};

const getStyles = () => ({
  list: {
    width: "90%",
  },
});

export default Contacts;
