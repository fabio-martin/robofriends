import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

const App = ({ store }) => {
  const [robots, setRobots] = useState([]);
  // const [searchfield, setSearchfield] = useState('');
  const searchField = useSelector((state) => state.searchField);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };

  const filteredRobots = robots.filter((robot) => robot.name.toLowerCase().includes(searchField.toLowerCase()));

  return !robots.length ? (
    <h1 className="f1">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
};

export default App;
