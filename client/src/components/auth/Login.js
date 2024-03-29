import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logUser } from '../../actions/auth';

function Login({ logUser, isAuth }) {
	
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		logUser({ email, password });
	};

	if (isAuth) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="container">
			<section className="container">
				<h1 className="large text-primary">Log In</h1>
				<p className="lead">
					<i className="fa fa-user" /> Log In To Your Account
				</p>
				<form onSubmit={(e) => onSubmit(e)} className="form" autoComplete="none">
					<div className="form-group">
						<input value={email} onChange={(e) => onChange(e)} type="email" placeholder="Email Address" name="email" />
						<small className="form-text">
							This site uses Gravatar so if you want a profile image, use a Gravatar email
						</small>
					</div>
					<div className="form-group">
						<input
							value={password}
							onChange={(e) => onChange(e)}
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
						/>
					</div>

					<input type="submit" className="btn btn-primary" value="Log In" />
				</form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Sign Up</Link>
				</p>
			</section>
		</div>
	);
}

Login.propTypes = {
	logUser: PropTypes.func.isRequired,
	isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logUser })(Login);
