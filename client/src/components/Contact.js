import React from 'react';

const Contact = () => (
	<section className="contact-us-section" id="section-contact">
		<div className="container" style={{ transformOrigin: 'top right', transform: 'skewY(3deg)' }}>
			<div className="row my-auto">
				<div className="contact-us-text col-md-5">
					<h1>Contact Us</h1>
					<p>
						Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as
						posible
					</p>
				</div>
				<div className="col-md-7">
					<form className="contact-us row">
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Name" />
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Name" />
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Name" />
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Name" />
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<textarea
									name="message"
									className="form-control"
									id="message"
									rows="4"
									placeholder="Your Message"
								/>
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<button type="submit" className="btn btn-success">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
);

export default Contact;
