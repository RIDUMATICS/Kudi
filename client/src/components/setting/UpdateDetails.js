import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { updateDetails } from '../../actions/authActions'

class UpdateDetails extends Component {
	constructor(props) {
		super(props);

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);

		this.state = {
			editFirstName: false,
			editLastName: false,
			firstName: '',
			lastName: '',
			enable2FA: false
		};
	}

	onChangeHandler({ target }) {
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[target.name]: value
		});
	}

	cancelEdit(type) {
		if (type === 'firstName') {
			this.setState({
				firstName: this.props.auth.user.firstName,
				editFirstName: false
			});
		} else if (type === 'lastName') {
			this.setState({
				lastName: this.props.auth.user.lastName,
				editLastName: false
			});
		}
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const { firstName, lastName, enable2FA } = this.state;
		this.props.updateDetails({ firstName, lastName, enable2FA });
		this.setState({
			editFirstName: false,
			editLastName: false,
			firstName: this.props.auth.user.firstName,
			lastName: this.props.auth.user.lastName,
			enable2FA: this.props.auth.user.enable2FA
		})
	}

	componentWillMount() {
		this.setState({
			firstName: this.props.auth.user.firstName,
			lastName: this.props.auth.user.lastName,
			enable2FA: this.props.auth.user.enable2FA
		});
	}
	render() {
		return (
			<Fragment>
				<h1>Update Details</h1>
				<p>It's a good idea to use a strong password that you're not using elsewhere</p>
				<form onSubmit={this.onSubmitHandler}>
					<div class="form-group row">
						<label for="firstName" className="col-sm-2 col-form-label order-1">
							First Name
						</label>
						<div className="col-sm-3 order-3 order-sm-2">
							<input
								type="text"
								readonly={this.state.editFirstName}
								className={classnames(
									'',
									{ 'form-control-plaintext': !this.state.editFirstName },
									{ 'form-control': this.state.editFirstName }
								)}
								id="firstName"
								name="firstName"
								onChange={this.onChangeHandler}
								value={this.state.firstName}
							/>
						</div>
						{this.state.editFirstName ? (
							<span className="order-2 order-sm-3">
								<button
									className="btn btn-outline-secondary"
									onClick={() => this.cancelEdit('firstName')}
								>
									Cancel
								</button>
							</span>
						) : (
							<span className="p-2 order-2 order-sm-3">
								<FontAwesomeIcon icon={faPen} onClick={() => this.setState({ editFirstName: true })} />
							</span>
						)}
					</div>
					<div class="form-group row">
						<label for="lastName" class="col-sm-2 col-form-label">
							Last Name
						</label>
						<div class="col-sm-3">
							<input
								type="text"
								readonly={this.state.editLastName}
								className={classnames(
									'',
									{ 'form-control-plaintext': !this.state.editLastName },
									{ 'form-control': this.state.editLastName }
								)}
								id="lastName"
								name="lastName"
								onChange={this.onChangeHandler}
								value={this.state.lastName}
							/>
						</div>
						{this.state.editLastName ? (
							<span className="order-2 order-sm-3">
								<button
									className="btn btn-outline-secondary"
									onClick={() => this.cancelEdit('lastName')}
								>
									Cancel
								</button>
							</span>
						) : (
							<span className="p-2 order-2 order-sm-3">
								<FontAwesomeIcon icon={faPen} onClick={() => this.setState({ editLastName: true })} />
							</span>
						)}
					</div>
					<div className="form-group row col-lg-12 col-md-12">
						<div className="custom-control custom-switch">
							<input
								type="checkbox"
								class="custom-control-input"
								id="customSwitch"
								name="enable2FA"
								checked={this.state.enable2FA}
								onChange={this.onChangeHandler}
							/>
							<label className="custom-control-label" htmlFor="customSwitch">
								Enable 2 factor authentication
							</label>
						</div>
					</div>
					<button type="submit" class="btn btn-primary">
						Update
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

export default connect(mapStateToProps, { updateDetails })(UpdateDetails);
