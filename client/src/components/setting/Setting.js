import React, { Component } from 'react';
import DashboardLayout from '../DashboardLayout';
import ChangePassword from './ChangePassword';
import { Route } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';

export default class Setting extends Component {
	render() {
		return (
			<DashboardLayout>
				<div className="content-wrapper my-5 py-4">
					<div className="container-fluid">
            <Route path="/settings/change-password" component={ ChangePassword } />
						<Route path="/settings/update-details" component={ UpdateDetails } />
          </div>
				</div>
			</DashboardLayout>
		);
	}
}
