/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Popover from 'components/popover';
import viewport from 'lib/viewport';

/**
 * Module variables
 */
const noop = () => {};

class Tooltip extends Component {
	render() {
		if ( ! this.props.showOnMobile && viewport.isMobile() ) {
			return null;
		}

		const classes = classnames(
			'popover__container',
			'tooltip',
			`is-${ this.props.status }`
		);

		return (
			<Popover
				className={ classes }
				isVisible={ this.props.isVisible }
				context={ this.props.context }
				onClose={ noop }
				position={ this.props.position }
			>
				{ this.props.children }
			</Popover>
		);
	}
}

Tooltip.propTypes = {
	isVisible: PropTypes.bool,
	position: PropTypes.string,
	status: PropTypes.string,
	showOnMobile: PropTypes.bool
};

Tooltip.defaultProps = {
	position: 'top',
	showOnMobile: false
};

export default Tooltip;
