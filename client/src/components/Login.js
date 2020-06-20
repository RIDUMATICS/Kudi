import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from './../actions/authActions';
import { connect } from 'react-redux';
import Verify2FA from './Verify2FA';
import Loader from 'react-loader-spinner';

class Login extends Component {
	constructor(props) {
		super(props);

		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);

		this.state = {
			error: '',
			email: '',
			password: ''
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	onChangeHandler({ target }) {
		const value = target.value;
		this.setState({
			[target.name]: value
		});
	}

	onSubmitHandler(e) {
		e.preventDefault();

		const data = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(data, this.props.history);
	}

	render() {
		return (<>
			{ this.props.auth.isLoading && <Loader
					type="BallTriangle"
					color="#00BFFF"
					height={100}
					width={100}
					className="loader"
				/>
			}
			<section className="row" id="login-section">
				<Verify2FA showModal={this.props.auth.enable2FA} /> <div className="col-lg-6 login-img" />
				<div className="col-lg-6 d-flex flex-column">
					<div className="container my-auto text-center login-content">
						<h2 className="pb-3"> KUDI </h2> <h3> Welcome back </h3>{' '}
						<p>
							New to Kudi ? <Link to="/signup"> Sign up </Link>{' '}
						</p>{' '}
						<form className="px-5 pt-2" onSubmit={this.onSubmitHandler}>
							{' '}
							{this.props.error.component === 'logIn' && (
								<div className="col-lg-12 col-md-12 p-0">
									<div className="alert alert-danger mb-2"> {this.props.error.message} </div>{' '}
								</div>
							)}{' '}
							<div className="form-group">
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Your email address"
									className="form-control"
									onChange={this.onChangeHandler}
								/>{' '}
							</div>{' '}
							<div className="form-group">
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Your password"
									className="form-control"
									onChange={this.onChangeHandler}
								/>{' '}
							</div>{' '}
							<button type="submit" className="btn btn-primary">
								Login{' '}
							</button>{' '}
						</form>{' '}
					</div>{' '}
				</div>{' '}
			</section>
		</>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, {
	loginUser
})(withRouter(Login));
