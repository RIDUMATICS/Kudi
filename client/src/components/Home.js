import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Header from './Header';
import Features from './Features';
import Contact from './Contact';

const Home = () => (
	<main>
		<Header />
		<Features />
    <Contact />
		<footer className="mt-5 mb-5">
			<div className="container pt-5">
				<div className="row text-center">
					<div className="col">
						<ul className="list-inline pt-5">
							<li className="list-inline-item p-1">
								<FontAwesomeIcon icon={faTwitter} />
							</li>
							<li className="list-inline-item p-1">
								<FontAwesomeIcon icon={faLinkedin} />
							</li>
							<li className="list-inline-item p-1">
								<FontAwesomeIcon icon={faGithubAlt} />
							</li>
						</ul>
					</div>
				</div>
				<div>
					<p>&copy; 2020 Kudi Bank. All Rights Reserved</p>
					<p>Designed & Developed by Ridwan Onikoyi (Ridumatics).</p>
				</div>
			</div>
		</footer>
	</main>
);

export default Home;
