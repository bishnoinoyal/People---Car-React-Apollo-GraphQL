import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CarUpdate from "../forms/CarUpdate";
import RemoveCar from "../buttons/RemoveCar";

const CardCar = ({ id, firstName, lastName, car }) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <CarUpdate
          id={car.id}
          year={car.year}
          make={car.make}
          model={car.model}
          price={car.price}
          personId={id}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={{ ...styles.card}}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={car.id} />,
          ]}
        >
          <p>
            {car.year} {car.make} {car.model} -- ${car.price}{" "}
          </p>
        </Card>
      )}
    </>
  );
};

const getStyles = () => ({
  card: {
    padding: "0px",
    border: "1px solid #d3d3d3", 
    borderRadius: 0, 
    width: "100%", 
    margin: "10px"
  },

});

export default CardCar;
