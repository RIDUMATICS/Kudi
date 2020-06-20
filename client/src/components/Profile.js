import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Link } from 'react-router-dom';

export default function Profile(props) {
	return (
		<DashboardLayout>
			<div className="content-wrapper my-5 py-4">
				<div className="container-fluid">
					<div className="d-flex pt-md-5 px-md-5 row px-3">
						<table className="table table-bordered col-md-8 col-12 order-3 order-md-1">
							<thead>
								<tr>
									<th scope="col" colSpan={2}>
										Bio Data
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">First Name</th>
									<td>{props.user.firstName}</td>
								</tr>
								<tr>
									<th scope="row">Last Name</th>
									<td>{props.user.lastName}</td>
								</tr>
								<tr>
									<th scope="row">Email</th>
									<td>{props.user.email}</td>
								</tr>
								<tr>
									<th scope="row">Phone</th>
									<td>{props.user.phoneNumber}</td>
								</tr>
								<tr>
									<th scope="row">Type</th>
									<td>{props.user.type}</td>
								</tr>
								{props.user.type === 'staff' && (
									<tr>
										<th scope="row">Admin</th>
										<td>{`${props.user.isAdmin}`}</td>
									</tr>
								)}
								<tr>
									<th scope="row">Enable 2FA</th>
									<td>{props.user.enable2FA ? 'Yes' : 'No'}</td>
								</tr>
								<tr>
									<td colSpan={2} className="text-right">
										{' '}
										<Link to="/settings/update-details">Edit Personal Details</Link> | <Link to="/settings/change-password">Change Password</Link>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="col-md-1 col-0 order-2" />
						<div className="col-md-3 col-12 px-auto text-center order-1 order-md-3">
							<div className="card" style={{ width: '18rem' }}>
								<div className="card-header text-center bg-light py-2 font-weight-bold">
									Profile Image
								</div>
								<img className="card-img-top" src={props.user.profileImage} alt="user profile" />
								<div className="card-body text-center bg-light">
									{/* <a href="#" className="btn btn-primary">
										Change Photo
									</a> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
