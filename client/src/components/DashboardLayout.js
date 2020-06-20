import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {
	faTachometerAlt,
	faSignOutAlt,
	faAngleLeft,
	faAngleRight,
	faFileInvoiceDollar,
	faUsersCog,
	faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import './style/Dashboard.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './../actions/authActions';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.hideSideNav = this.hideSideNav.bind(this);
		this.showSetting = this.showSetting.bind(this);
		this.state = {
			sideNavToggle: false,
			showSetting: false
		};
	}

	hideSideNav(e) {
		e.preventDefault();

		this.setState((prevState) => ({
			sideNavToggle: !prevState.sideNavToggle
		}));
	}

	showSetting = (e) => {
		e.preventDefault();
		this.setState({
			showSetting: !this.state.showSetting
		})
	}

	render() {
		return (
			<main className={classnames('', { 'sidenav-toggled': this.state.sideNavToggle })}>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
					<NavLink className="navbar-brand" to="/">
						KUDI
					</NavLink>
					<button
						className="navbar-toggler navbar-toggler-right"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
							<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
								<NavLink exact to="/dashboard" activeClassName="active-sideBar" className="nav-link">
									<FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
									<span className="nav-link-text">Dashboard</span>
								</NavLink>
							</li>
							<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Accounts">
								<NavLink
									to={
										this.props.auth.user.isAdmin ? (
											'/dashboard/accounts'
										) : (
											'/dashboard/accounts/user'
										)
									}
									className="nav-link"
									activeClassName="active-sideBar"
								>
									<FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" />
									<span className="nav-link-text">Accounts </span>
								</NavLink>
							</li>
							<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Setting">
								<NavLink to="/settings" activeClassName="active-sideBar" className="dropdown-btn" onClick={ this.showSetting }>
									<FontAwesomeIcon icon={faUsersCog} className="mr-2" />
									<span className="nav-link-text">Setting</span>
									<FontAwesomeIcon className="float-right" icon={ this.state.showSetting ? faAngleDown : faAngleRight} />
								</NavLink>
								<div
									className={classnames('collapse', { 'show': this.state.showSetting })}
									id="collapseLayouts"
									aria-labelledby="headingOne"
									data-parent="#sidenavAccordion"
								>
									<nav className="sb-sidenav-menu-nested nav">
										<NavLink className="nav-link" to="/settings/change-password">
											Change Password
										</NavLink>
										<NavLink className="nav-link" to="/settings/update-details">
											Update Details
										</NavLink>
									</nav>
								</div>
							</li>
						</ul>
						<ul className="navbar-nav sidenav-toggler">
							<li className="nav-item">
								<button
									onClick={this.hideSideNav}
									type="button"
									className="nav-link text-center btn btn-block"
									id="sidenavToggler"
								>
									<FontAwesomeIcon icon={this.state.sideNavToggle ? faAngleRight : faAngleLeft} />
								</button>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item px-2">
								<img
									src={this.props.auth.user.profileImage}
									className="img-fluid img-icon mr-2"
									alt="..."
								/>
								{`${this.props.auth.user.firstName} ${this.props.auth.user.lastName}`}
							</li>
							<li className="nav-item">
								<button
									className="nav-link btn btn-outline-white"
									data-toggle="modal"
									data-target="#exampleModal"
									onClick={() => this.props.logoutUser()}
								>
									<FontAwesomeIcon icon={faSignOutAlt} />Logout
								</button>
							</li>
						</ul>
					</div>
				</nav>

				{this.props.children}

				<footer className="sticky-footer">
					<div className="container">
						<div className="text-center">
							<small>Copyright © Your Website 2018</small>
						</div>
					</div>
				</footer>
			</main>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
