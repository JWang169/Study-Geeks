import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import Homepage from './Homepage';
import Navigation from './Navigation';
import SignUp from './SignUp';
import LogIn from './Login';
import SearchStudents from './SearchStudents';
import SearchTutors from './SearchTutors';
import Demo from './Demo';
import PersonInfo from './PersonInfo';


function App() {
  return (
    <Router>
      <Container>
        <Navigation />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/demo' component={Demo} />
        <Route exact path='/searchtutors' component={SearchTutors} />
        <Route exact path='/searchstudents' component={SearchStudents} />
        <Route exact path='/students/:id' component={PersonInfo} />
      </Container>
    </Router>
  );
}

export default App;
