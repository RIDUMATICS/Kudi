import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Features = () => (
	<section id="section-features">
		<div className="container pt-features mb-5 ">
			<div className="row justify-content-center mb-5">
				<div className="col-md-6 text-center ft-heading">
					<h5 className="text-uppercase">
						<strong>Features</strong>
					</h5>
					<h2>App Features</h2>
				</div>
			</div>
			<div id="myCarousel" className="carousel slide" data-ride="carousel">
				<div className="carousel-inner row w-100 mx-auto">
					<div className="carousel-item col-md-4 active">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="wallet.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Instant Cashout</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item col-md-4 ">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="email.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Email notifications</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item col-md-4 ">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="piggy-bank.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Zero Charges</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item col-md-4 ">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="encrypted.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Fully Encrypted</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item col-md-4 ">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="padlock.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Safe and Secure</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item col-md-4 ">
						<div className="card card-profile">
							<div className="card-avatar p-4">
								<img className="img" src="dashboard.svg" alt="" />
							</div>
							<div className="table">
								<h4 className="card-caption pb-2">Simple dashboard</h4>
								<p className="card-description">
									Don't be scared of the truth because we need to restart the human foundation in
									truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the
									back is...
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12 text-center mt-4">
							<button className="btn btn-outline-secondary mx-1 prev" title="Previous">
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<button className="btn btn-outline-secondary mx-1 next" title="Next">
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Features;
