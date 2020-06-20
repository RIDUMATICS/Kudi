import React, { Component } from 'react';
import classnames from 'classnames';
import './style/Model.css';

class componentName extends Component {
	constructor(props) {
		super(props);

		this.hideModel = this.hideModel.bind(this);
	}

	hideModel() {
		this.props.closeModal();
	}

	render() {
		return (
			<div
				className={classnames('modal fade', { show: this.props.display })}
				id="exampleModalCenter"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalCenterTitle"
				aria-modal="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">
								{this.props.title}
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={this.hideModel}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">{this.props.children}</div>
						<div className="modal-footer d-block"><p className="text-center d-block"> &copy; 2020 Kudi Bank </p></div>
					</div>
				</div>
			</div>
		);
	}
}

componentName.propTypes = {};

export default componentName;
