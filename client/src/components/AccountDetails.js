import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import {
	getAccountDetails,
	creditAccount,
	debitAccount,
	updateAccountStatus,
	deleteAccount
} from './../actions/accountActions';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';

class AccountDetails extends Component {
	constructor(props) {
		super(props);

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.creditAccount = this.creditAccount.bind(this);
		this.debitAccount = this.debitAccount.bind(this);
		this.updateAccountStatus = this.updateAccountStatus.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);

		this.state = {
			status: '',
			amount: 0,
			updateStatus: false,
			debitAccount: false,
			creditAccount: false,
			deleteAccount: false
		};
	}

	componentDidMount() {
		this.props.getAccountDetails(this.props.match.params.accountNumber);
	}

	onChangeHandler({ target }) {
		const value = target.value;
		this.setState({
			[target.name]: value
		});
	}

	async creditAccount() {
		await this.props.creditAccount(this.props.match.params.accountNumber, this.state.amount);
		await this.props.getAccountDetails(this.props.match.params.accountNumber);
		this.closeModal();
	}

	async debitAccount() {
		await this.props.debitAccount(this.props.match.params.accountNumber, this.state.amount);
		await this.props.getAccountDetails(this.props.match.params.accountNumber);
		this.setState({ debitAccount: false });
		this.closeModal();
	}

	async updateAccountStatus() {
		await this.props.updateAccountStatus(
			this.props.match.params.accountNumber,
			this.state.status,
			this.props.history
		);
		this.setState({
			updateStatus: false
		});
	}

	deleteAccount() {
		this.props.deleteAccount(this.props.match.params.accountNumber, this.props.history);
	}

	closeModal() {
		this.setState({
			status: '',
			amount: 0,
			updateStatus: false,
			debitAccount: false,
			creditAccount: false,
			deleteAccount: false
		});
	}

	render() {
		return (
			<DashboardLayout>
				{this.props.auth.isLoading && (
					<Loader type="BallTriangle" color="#00BFFF" height={100} width={100} className="loader" />
				)}
				<Modal display={this.state.debitAccount} title="Debit Account" closeModal={this.closeModal}>
					<div class="col-auto">
						<label class="sr-only" htmlFor="inlineFormInputGroup">
							Amount
						</label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">Amount</div>
							</div>
							<input
								type="number"
								class="form-control"
								id="inlineFormInputGroup"
								placeholder="amount"
								name="amount"
								value={this.state.amount}
								onChange={this.onChangeHandler}
							/>
						</div>
						<button className="btn btn-primary float-right mx-2" onClick={this.debitAccount}>
							Confirm
						</button>
						<button className="btn btn-secondary float-right" onClick={this.closeModal}>
							Cancel
						</button>
					</div>
				</Modal>

				<Modal display={this.state.creditAccount} title="Credit Account" closeModal={this.closeModal}>
					<div class="col-auto">
						<label class="sr-only" htmlFor="inlineFormInputGroup">
							Amount
						</label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">Amount</div>
							</div>
							<input
								type="number"
								class="form-control"
								id="inlineFormInputGroup"
								placeholder="amount"
								name="amount"
								value={this.state.amount}
								onChange={this.onChangeHandler}
							/>
						</div>
						<button className="btn btn-primary float-right mx-2" onClick={this.creditAccount}>
							Confirm
						</button>
						<button className="btn btn-secondary float-right" onClick={this.closeModal}>
							Cancel
						</button>
					</div>
				</Modal>

				<Modal display={this.state.updateStatus} title="Update Account Status" closeModal={this.closeModal}>
					<div class="col-auto">
						<label class="sr-only" htmlFor="inlineFormInputGroup">
							Status
						</label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">Status</div>
							</div>
							<select
								class="form-control"
								id="exampleFormControlSelect1"
								name="status"
								value={this.state.status}
								onChange={this.onChangeHandler}
							>
								<option value="" disabled>
									select account status
								</option>
								<option value="dormant">dormant</option>
								<option value="active">active</option>
							</select>
						</div>
						<button className="btn btn-primary float-right mx-2" onClick={this.updateAccountStatus}>
							Confirm
						</button>
						<button className="btn btn-secondary float-right" onClick={this.closeModal}>
							Cancel
						</button>
					</div>
				</Modal>

				<Modal display={this.state.deleteAccount} title="Are you absolutely sure?" closeModal={this.closeModal}>
					<div class="col-auto">
						<p> This action cannot be undone. This will permanently delete this account</p>
						<button className="btn btn-primary float-right mx-2" onClick={this.deleteAccount}>
							Confirm
						</button>
						<button className="btn btn-secondary float-right" onClick={this.closeModal}>
							Cancel
						</button>
					</div>
				</Modal>

				<div className="content-wrapper my-5 py-4">
					<div className="container-fluid">
						<div className="row p-2">
							{this.props.error.component === 'accounts' && (
								<div className="col-lg-12 col-md-12 p-0">
									<div className="alert alert-danger mb-2"> {this.props.error.message} </div>{' '}
								</div>
							)}{' '}
							<button
								className="col- btn btn-primary m-2"
								onClick={() => this.setState({ updateStatus: !this.state.updateStatus })}
							>
								Update Account Status
							</button>
							<button
								className="col- btn btn-primary m-2"
								onClick={() => this.setState({ debitAccount: !this.state.debitAccount })}
							>
								Debit Account
							</button>
							<button
								className="col- btn btn-primary m-2"
								onClick={() => this.setState({ creditAccount: !this.state.creditAccount })}
							>
								Credit Account
							</button>
							<button
								className="col- btn btn-danger m-2"
								onClick={() => this.setState({ deleteAccount: !this.state.creditAccount })}
							>
								Delete Account
							</button>
						</div>

						<div class="card mb-3">
							<div class="card-header">
								<FontAwesomeIcon icon={faTable} /> Accounts
							</div>
							<div class="card-body">
								<div className="row p-2">
									<div className="col-md-2 col-md-offset-1">
										<p>Account Name: </p>
										<p>
											{this.props.account.user &&
												`${this.props.account.user.firstName} ${this.props.account.user
													.lastName}`}
										</p>
									</div>
									<div className="col-md-2">
										<p>Account Number: </p>
										<p>{this.props.account.accountNumber}</p>
									</div>
									<div className="col-md-2">
										<p>Account Balance: </p>
										<p>&#8358; {this.props.account.balance}</p>
									</div>
									<div className="col-md-2">
										<p>Status: </p>
										<p>{this.props.account.status}</p>
									</div>
									<div className="col-md-2">
										<p>Created: </p>
										<p>{this.props.account.createdOn}</p>
									</div>
									<div className="col-12">
										<form className="form-inline">
											Show
											<select className="form-control mx-2" id="exampleFormControlSelect1">
												<option>10</option>
												<option>20</option>
												<option>30</option>
												<option>40</option>
												<option>50</option>
											</select>
											Transactions
										</form>
									</div>
								</div>
								{!this.props.account.transactions || this.props.account.transactions <= 0 ? (
									<div class="alert alert-primary" role="alert">
										Oh! No There are no transactions history on this account at this time
									</div>
								) : (
									<div class="table-responsive">
										<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
											<thead>
												<tr>
													<th>Date</th>
													<th>Transaction</th>
													<th>Amount</th>
													<th>Old Balance</th>
													<th>Balance</th>
												</tr>
											</thead>
											<tbody>
												{this.props.account.transactions
													.reverse()
													.map(({ createdOn, type, amount, oldBalance, newBalance }) => (
														<tr>
															<th>{createdOn}</th>
															<th>{type}</th>
															<th>{amount}</th>
															<th>{oldBalance}</th>
															<th>{newBalance}</th>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								)}
							</div>
							<div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	account: state.account,
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, {
	getAccountDetails,
	creditAccount,
	debitAccount,
	updateAccountStatus,
	deleteAccount
})(withRouter(AccountDetails));
