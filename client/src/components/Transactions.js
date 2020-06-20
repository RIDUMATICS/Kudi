import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import { getTransactions } from './../actions/transactionAction';

class Transactions extends Component {
	componentDidMount() {
		this.props.getTransactions(this.props.match.params.transactionId);
	}

	render() {
		return (
			<DashboardLayout>
				<div class="content-wrapper my-5 py-4">
					<div class="container-fluid">
						<div class="card mb-3">
							<div class="card-header">
								<FontAwesomeIcon icon={faTable} /> Transactions
							</div>
							<div class="card-body">
								<div className="row p-2">
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
								{this.props.transactions.length <= 0 ? (
									<div class="alert alert-primary" role="alert">
										Oh! No Transactions History Reach out to our agent for both cash deposit and
										withdrawal
									</div>
								) : (
									<div class="table-responsive">
										<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
											<thead>
												<tr>
													<th>ID</th>
													<th>Type</th>
													<th>Amount</th>
													<th>Previous Balance</th>
													<th>New Balance</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												{this.props.transactions.map((transaction, index) => (
													<tr>
														<td>{index + 1}</td>
														<td>{transaction.type}</td>
														<td>NGN {transaction.amount}</td>
														<td>NGN {transaction.oldBalance}</td>
														<td>NGN {transaction.newBalance}</td>
														<td>{transaction.createdOn}</td>
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
	transactions: state.transactions
});

export default connect(mapStateToProps, { getTransactions })(Transactions);
