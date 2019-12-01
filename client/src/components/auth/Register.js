import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
	//we are using useState in functional components to handle state for this component
	//formData is {} that will hold data values, and setFormData will emulate setState
	//like in class based components, useState will take objeckt with default values
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match');
			//we will make redux actions to send data to backend, but for now 
			//we will do it like this for testing purposes
		} else {
			const newUser = {
				name,
				email,
				password
			};
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};
				const body = JSON.stringify(newUser);
				const res = await axios.post('/api/users', body, config);
				//here on registration route we get the token ( on route api/users )
				//which we'll use to access protected routes
				console.log(res.data);
			} catch (error) {
				console.error(error.response.data);
			}
		}
	};

	return (
		<div className="container">
			<section className="container">
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fa fa-user" /> Create Your Account
				</p>
        <form 
        onSubmit={(e) => onSubmit(e)} 
        className="form" 
        autoComplete="none">
					<div className="form-group">
            <input 
            value={name} 
            onChange={(e) => onChange(e)} 
            type="text" 
            placeholder="Name" 
            name="name" 
            required />
					</div>
					<div className="form-group">
            <input 
            value={email} 
            onChange={(e) => onChange(e)} 
            type="email" 
            placeholder="Email Address" 
            name="email" />
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
					<div className="form-group">
						<input
							value={password2}
							onChange={(e) => onChange(e)}
							type="password"
							placeholder="Confirm Password"
							name="password2"
							minLength="6"
						/>
					</div>
					<input type="submit" className="btn btn-primary" value="Register" />
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</section>
		</div>
	);
}

export default Register;
