import React, { Component } from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { verifyToken } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

class Verify2FA extends Component {
	constructor(props) {
		super(props);

		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);

		this.state = {
			authyToken: ''
		};
	}

	onSubmitHandler(e) {
		e.preventDefault();
		this.props.verifyToken({ authyToken: this.state.authyToken }, this.props.history);
	}

	onChangeHandler({ target }) {
		const value = target.value;
		this.setState({
			[target.name]: value
		});
	}

	render() {
		return (
			<Modal display={this.props.auth.enable2FA} title="Enter your verification code">
				{this.props.error.component === 'verifyToken' && (
					<div className="col-lg-12 col-md-12 p-0">
						<div className="alert alert-danger mb-2"> {this.props.error.message} </div>{' '}
					</div>
				)}{' '}
				<p>
					We have sent a temporary verification code to {this.props.auth.user.phoneNumber}, Enter the code to
					verify
				</p>
				<form className="" onSubmit={this.onSubmitHandler}>
					{this.props.error.component === '2fa' && (
						<div className="col-lg-12 col-md-12">
							<div className="alert alert-danger mb-2"> {this.props.error.message} </div>
						</div>
					)}
					<div className="form-group">
						<input
							type="number"
							value={this.state.authyToken}
							name="authyToken"
							placeholder="Enter token"
							className="form-control"
							onChange={this.onChangeHandler}
						/>
					</div>
					<div className="text-right">
						<button type="submit" className="btn btn-primary mr-2" onClick={this.onSubmitHandler}>
							Verify
						</button>
						<button type="submit" className="btn btn-primary">
							Resend
						</button>
					</div>
				</form>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, { verifyToken })(withRouter(Verify2FA));
