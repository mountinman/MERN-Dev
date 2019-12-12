import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import { setAuthToken } from './helpers/setAuthToken';
import store from './store';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
//useEffect is lifecycle method, like in class based 
//components we have componentDidMount, but here we use functional components, and it is
//loop function so in orther to run it only once we have to add another paramether -> []
//so it will act as componentDidMount method and run when App component is mounted to the DOM 
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

	return (
		<Provider store={store}>
			<Router>
				<NavBar />
				<div className="container">
					<Alert />
				</div>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
