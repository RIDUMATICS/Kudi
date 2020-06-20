import React, { Component } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import { getAccounts, createAccount } from './../actions/accountActions';
import { clearError } from './../actions/errorAction';
import Account from './Account';
import { Redirect } from 'react-router-dom';

class Accounts extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.handleShowTransaction = this.handleShowTransaction.bind(this);

		this.state = {
			type: ''
		};
	}

	handleChange(event) {
		this.setState({ type: event.target.value });
	}

	async onSubmitHandler(event) {
		await event.preventDefault();
		await this.props.createAccount({ type: this.state.type });
		await this.props.getAccounts();
	}

	handleShowTransaction(accountNumber) {
		this.props.history.push(`/dashboard/transactions/${accountNumber}`);
	}

	componentDidMount() {
		this.props.clearError();
		this.props.getAccounts();
	}

	render() {
		return this.props.auth.user.isAdmin ? (
			<Redirect to="/dashboard/accounts" />
		) : (
			<DashboardLayout>
				<div className="content-wrapper my-5 py-4">
					<div className="container-fluid">
						<div className="row d-flex justify-content-around">
							{this.props.error.component === 'accounts' && (
								<div className="col-lg-12 col-md-12 p-0">
									<div className="alert alert-danger mb-2"> {this.props.error.message} </div>{' '}
								</div>
							)}{' '}
							{this.props.accounts.map((account) => (
								<Account
									key={account.accountNumber}
									account={account}
									showTransaction={this.handleShowTransaction}
								/>
							))}
							{this.props.accounts.length < 2 && (
								<div className="card col-md-" style={{ width: '20rem' }}>
									<div className="card-body">
										<h5 className="card-title">Create Account</h5>
										<div className="card-text">
											<form>
												<div className="form-group">
													<label htmlFor="exampleFormControlSelect1">Account Type</label>
													<select
														className="form-control"
														id="exampleFormControlSelect1"
														defaultValue=""
														onChange={this.handleChange}
													>
														<option value="" disabled>
															{' '}
															Select Account Type
														</option>
														<option value="savings">Savings</option>
														<option value="current">Current</option>
													</select>
												</div>
											</form>
										</div>
										<button
											type="button"
											className="card-link btn btn-primary"
											onClick={this.onSubmitHandler}
										>
											Create
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	accounts: state.accounts,
	error: state.error
});
export default connect(mapStateToProps, { getAccounts, createAccount, clearError })(Accounts);
