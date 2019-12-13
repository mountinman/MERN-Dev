import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

function NavBar({ auth: { isAuth, loading }, logout }) {
  
  const authLinks = (
		<ul>
			<li>
				<a onClick={logout} href="#!">
					<i className="fa fa-sign-out" /> <span className="hide-sm">Logout</span>
				</a>
			</li>
		</ul>
	);

	const GuestLinks = (
		<ul>
			<li>
				<a href="#!">Developers</a>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fa fa-code" /> DevConnectorApp
				</Link>
			</h1>
			{!loading && <Fragment>{isAuth ? authLinks : GuestLinks}</Fragment>}
		</nav>
	);
}

NavBar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
