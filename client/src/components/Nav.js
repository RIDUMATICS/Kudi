import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"

const Nav = (props) => (
	<nav className="navbar navbar-expand-lg navbar-dark pb_navbar pb_scrolled-light sleep pt-4" id="pb-navbar" style={{ background: props.background}}>
		<div className="container">
			<Link className="navbar-brand" to="/">
				KUDI
			</Link>
			<button
				className="navbar-toggler ml-auto"
				type="button"
				data-toggle="collapse"
				data-target="#probootstrap-navbar"
				aria-controls="probootstrap-navbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span>
					<FontAwesomeIcon icon={faBars} />
				</span>
			</button>
			{ props.children }
			</div>
	</nav>
);

export default Nav;
