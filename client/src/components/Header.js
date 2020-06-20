import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const Header = () => (
	<header id="section-home">
		<Nav background='transparent'>
			<div className="collapse navbar-collapse" id="probootstrap-navbar">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<a className="nav-link active" href="#section-home">
							Home
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#section-features">
							Features
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#section-contact">
							Contact Us
						</a>
					</li>
					<li className="nav-item cta-btn ml-xl-4 ml-lg-4 ml-md-0 ml-sm-0 ml-0">
						<Link className="nav-link btn btn-outline-white" to="login">
							<span className="pb_rounded-4 px-4">Login</span>
						</Link>
					</li>
				</ul>
			</div>
		</Nav>
		<section className="container">
			<div className="row">
				<div className="col-md-6  mt-auto p-2">
					<h2 className="heading mb-3">Celebrating a decade of powerful banking</h2>
					<div className="sub-heading">
						<p className="mb-4">
							Get the financial tools and insights to start, build, and grow your business.
						</p>
						<p className="mb-5">
							<Link
								className="btn btn-success btn-lg pb_btn-pill smoothscroll"
								href="#section-pricing"
								to="/signup"
							>
								<span className="pb_font-14 text-uppercase pb_letter-spacing-1">REGISTER</span>
							</Link>
						</p>
					</div>
				</div>
				<div className="col-md-6 p-5">
					<img src="undraw_wallet_aym5.svg" alt="logo" className="img-fluid" />
				</div>
			</div>
		</section>
	</header>
);

export default Header;
