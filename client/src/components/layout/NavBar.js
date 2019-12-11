import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fa fa-code" /> DevConnectorApp
				</Link>
			</h1>
			<ul>
				<li>
					<a href="profiles.html">Developers</a>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
