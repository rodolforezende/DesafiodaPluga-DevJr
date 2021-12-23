import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = function () {
  const [search, setSearch] = React.useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      <div>
        <SearchBar placeholder="Buscar Ferramenta" callback={handleChange} state={search} />
      </div>
    </div>
  );
};

export default Home;
