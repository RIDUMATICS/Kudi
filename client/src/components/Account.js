import React from 'react';

const Account = (props) => (
	<div key={props.account.accountNumber} className="card col-md-" style={{ width: '20rem' }}>
		<div className="card-header">Account</div>
		<ul className="list-group list-group-flush">
			<li className="list-group-item">Account Number : {props.account.accountNumber}</li>
			<li className="list-group-item">Balance : {props.account.balance} NGN</li>
			<li className="list-group-item">Type : {props.account.type}</li>
			<li className="list-group-item">Status : {props.account.status}</li>
			<li className="list-group-item">Created On : {props.account.createdOn}</li>
			<li className="list-group-item">
				<button
					type="button"
					className="btn btn-outline-primary btn-block"
					onClick={() => props.showTransaction(props.account.accountNumber)}
				>
					View Transactions
				</button>
			</li>
		</ul>
	</div>
);

export default Account;
