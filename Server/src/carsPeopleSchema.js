import find from 'lodash.find'
import remove from 'lodash.remove'

const people = [
  {
    id: '1',
    firstName: 'Noyal',
    lastName: 'Godara'
  },
  {
    id: '2',
    firstName: 'Anshuma',
    lastName: 'Yadav'
  },
  {
    id: '3',
    firstName: 'Neeraj',
    lastName: 'Goyal'
  },
  {
    id: '4',
    firstName: 'Harsh',
    lastName: 'Kaushik'
  },
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Honda',
    model: 'Accord',
    price: '38000',
    personId: '1'
  },
  {
    id: '2',
    year: '2012',
    make: 'Toyota',
    model: 'Supra',
    price: '123000',
    personId: '1'
  },
  {
    id: '3',
    year: '2024',
    make: 'Honda',
    model: 'Accord',
    price: '50000',
    personId: '1'
  },
  {
    id: '4',
    year: '2012',
    make: 'Lexus ',
    model: 'RX 500h',
    price: '81100',
    personId: '2'
  },
  {
    id: '5',
    year: '1968',
    make: 'Ford',
    model: 'Mustang',
    price: '42000',
    personId: '2'
  },
  {
    id: '6',
    year: '2023',
    make: 'Dodge',
    model: 'Challender SRT Hellcat Redeye W-Body Jailbreak',
    price: '130000',
    personId: '2'
  },
  {
    id: '7',
    year: '2023',
    make: 'Cadillac',
    model: 'CT5-V Blackwing',
    price: '121000',
    personId: '3'
  },
  {
    id: '8',
    year: '2023',
    make: 'Aston Martin',
    model: 'Vantage V8 Roadster',
    price: '150000',
    personId: '3'
  },
  {
    id: '9',
    year: '2023',
    make: 'Ford',
    model: 'Mustang Shelby GT500',
    price: '240000',
    personId: '3'
  },
  {
    id: '10',
    year: '2023',
    make: 'Mercedes-AMG',
    model: 'E63 S',
    price: '130000',
    personId: '4'
  },
  {
    id: '11',
    year: '2023',
    make: 'Nissan',
    model: 'GT-R',
    price: '160000',
    personId: '4'
  },
  {
    id: '12',
    year: '2023',
    make: 'Brabus - Mercedes',
    model: 'G-63 AMG',
    price: '500000',
    personId: '4'
  },
]

const typeDefs = `
  type Person {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  }

  type Query {
    person(id: String!): Person
    people: [Person]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    removeCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    person: (root, { id }) => find(people, { id }),
    people: () => people
  },
  Mutation: {
    addPerson: (root, { id, firstName, lastName }) => {
      const newPerson = { id: id, firstName, lastName, cars: [] };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, { id, firstName, lastName }) => {
      const person = find(people, { id });
      if (!person) throw new Error(`Person with id ${id} not found.`);
      person.firstName = firstName;
      person.lastName = lastName;
      return person;
    },
    removePerson: (root, { id }) => {
      const personIndex = people.findIndex(p => p.id === id);
      if (personIndex === -1) throw new Error(`Person with id ${id} not found.`);
      
      remove(cars, { personId: id });
      const [removedPerson] = people.splice(personIndex, 1);
      
      return removedPerson;
    },
    addCar: (root, { id, year, make, model, price, personId }) => {
      const newCar = { id: id, year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, { id, year, make, model, price, personId }) => {
      const carIndex = cars.findIndex(car => car.id === id && car.personId === personId);
      if (carIndex === -1) {
        throw new Error(`Car with id ${id} and personId ${personId} not found.`);
      }
    
      cars[carIndex] = { id, year, make, model, price, personId };
    
      return cars[carIndex];
    },
    removeCar: (root, { id }) => {
      const carIndex = cars.findIndex(c => c.id === id);
      if (carIndex === -1) throw new Error(`Car with id ${id} not found.`);
      const [removedCar] = cars.splice(carIndex, 1);
      return removedCar;
    }
  },
  Person: {
    cars: (person) => cars.filter(car => car.personId === person.id)
  }
};

export { typeDefs, resolvers }