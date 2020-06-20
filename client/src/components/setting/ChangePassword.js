import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword } from './../../actions/authActions';

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
			password: '',
			confirmPassword: ''
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onChangeHandler({ target }) {
		this.setState({
			[target.name]: target.value
		});
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const { oldPassword, password, confirmPassword } = this.state;
		this.props.changePassword({ oldPassword, password, confirmPassword });
	}

	render() {
		return (
			<Fragment>
				<h1>Change Password</h1>
				<p>It's a good idea to use a strong password that you're not using elsewhere</p>
				<form onSubmit={this.onSubmitHandler}>
					<div className="form-group row">
						<label htmlFor="oldPassword" className="col-sm-2 col-form-label">
							Current Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="oldPassword"
								value={this.state.oldPassword}
								name="oldPassword"
								onChange={this.onChangeHandler}
								autoComplete="true"
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="password" className="col-sm-2 col-form-label">
							New Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="password"
								value={this.state.password}
								name="password"
								onChange={this.onChangeHandler}
								autoComplete="true"
							/>
							<small className="form-text text-muted">* At least 8 characters</small>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="confirmPassword" className="col-sm-2 col-form-label">
							Confirm Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								value={this.state.confirmPassword}
								name="confirmPassword"
								onChange={this.onChangeHandler}
								autoComplete="true"
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
