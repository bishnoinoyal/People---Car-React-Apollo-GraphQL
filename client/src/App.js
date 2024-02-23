import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import ContactAdd from './components/forms/ContactAdd';
import Contacts from './components/lists/Contacts';
import CarAdd from './components/forms/CarAdd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Person from './components/layout/Person';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const MainRoute = () => (
  <div className='App'>
    <Title />
    <ContactAdd />
    <CarAdd />
    <Contacts />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<MainRoute />} />
          <Route path="/people/:id" element={<Person />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;