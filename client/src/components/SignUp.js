import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import Loader from 'react-loader-spinner';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';
import { registerUser } from './../actions/authActions';
import { clearError } from './../actions/errorAction';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onFileChange = this.onFileChange.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			profileImage: '',
			phone: '',
			password: '',
			confirmPassword: '',
			enable2FA: false
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	
	componentWillUnmount() {
		this.props.clearError();
	}

	onFileChange(e) {
		this.setState({
			profileImage: e.target.files[0]
		});
	}

	onChangeHandler({ target }) {
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[target.name]: value
		});
	}

	onSubmitHandler(e) {
		e.preventDefault();
		
		let countryCode; let number;
		
		if ( this.state.phone && this.state.phone.trim().length ) {
			countryCode = parsePhoneNumber(this.state.phone).countryCallingCode;
			number = parsePhoneNumber(this.state.phone).number;
		}
		const data = new FormData();
		data.append('firstName', this.state.firstName);
		data.append('lastName', this.state.lastName);
		data.append('email', this.state.email);
		data.append('profileImage', this.state.profileImage);
		data.append('phoneNumber', number);
		data.append('countryCode', countryCode);
		data.append('password', this.state.password);
		data.append('confirmPassword', this.state.confirmPassword);
		data.append('enable2FA', this.state.enable2FA);

		this.props.registerUser(data, this.props.history);
	}

	render() {
		return (
			<section className="row" id="login-section">
				{ this.props.auth.isLoading && <Loader
					type="BallTriangle"
					color="#00BFFF"
					height={100}
					width={100}
					className="loader"
				/>
			}
				<div className="col-lg-6 login-img" />
				<div className="col-lg-6 d-flex flex-column">
					<div className="container my-auto login-content">
						<h2 className="pb-2 text-center"> KUDI </h2>
						<h3 className="text-center"> Open up your Kudi account now </h3>
						<p className="text-center ">
							Already signed up ?
							<Link to="/login"> Log in </Link>
						</p>
						<form method="post" className="px-5 pt-2 row signup" onSubmit={this.onSubmitHandler}>
							{this.props.error.component === 'signUp' && (
								<div className="col-lg-12 col-md-12">
									<div className="alert alert-danger mb-2"> {this.props.error.message} </div>
								</div>
							)}
							<div className="form-group col-lg-6 col-md-6">
								<input
									type="text"
									name="firstName"
									placeholder="First Name"
									className="form-control"
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group col-lg-6 col-md-6">
								<input
									type="text"
									name="lastName"
									placeholder="Last Name"
									className="form-control"
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<input
									type="email"
									name="email"
									placeholder="Your email address"
									className="form-control"
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<PhoneInput
									placeholder="Enter phone number"
									value={this.state.phone}
									onChange={(phone) =>
										this.setState({
											phone
										})}
								/>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<input
									type="file"
									name="profileImage"
									placeholder="Profile Image"
									onChange={this.onFileChange}
									className="form-control-file"
								/>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<input
									type="password"
									name="password"
									placeholder="Your password"
									onChange={this.onChangeHandler}
									autoComplete="password"
									className="form-control"
								/>
								<small id="passwordHelpBlock" className="form-text text-muted">
									password must be at least 8 characters long; must contain at least one lowercase
									letter, one uppercase letter, one numeric digit, and one special character
								</small>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm your password"
									onChange={this.onChangeHandler}
									autoComplete="confirmPassword"
									className="form-control"
								/>
							</div>
							<div className="form-group col-lg-12 col-md-12">
								<div className="custom-control custom-switch">
									<input
										type="checkbox"
										class="custom-control-input"
										name="enable2FA"
										id="customSwitch"
										checked={this.state.enable2FA}
										onChange={this.onChangeHandler}
									/>
									<label className="custom-control-label" htmlFor="customSwitch">
										Enable 2 factor authentication
									</label>
								</div>
							</div>
							<button type="submit" className="btn btn-primary mx-3">
								Register
							</button>
						</form>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, {
	registerUser,
	clearError
})(withRouter(SignUp));
