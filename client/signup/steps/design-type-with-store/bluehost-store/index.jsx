/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import identity from 'lodash/identity';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import StepHeader from 'signup/step-header';
import Button from 'components/button';
import { abtest } from 'lib/abtest';
import { localize } from 'i18n-calypso';
import { recordTracksEvent } from 'state/analytics/actions';

function getPrice() {
	return 'bluehost' === abtest( 'signupStoreBenchmarking' ) ? '$3.95' : '$12.95';
}

export const BluehostStoreStep = props => {
	const {
		onBackClick,
		translate,
		recordPartnerClick,
		partnerName,
		partnerUrl
	} = props;

	return (
		<div>
			<StepHeader
				headerText={ translate( 'Create a WordPress Store' ) }
				subHeaderText={ translate( 'Our partners at BlueHost and WooCommerce are here for you' ) }
			/>

			<div className="design-type-with-store__container">
				<div className="design-type-with-store__copy">
					<img src="/calypso/images/signup/bluehost-logo.png" className="design-type-with-store__bluehost-logo" />
					{ translate(
						'We\'ve partnered with BlueHost, a top-notch WordPress hosts ' +
						'with a knack for building great e-commerce stores using WooCommerce.'
					) }
				</div>

				<div className="design-type-with-store__form">
					<span className="design-type-with-store__price-text"> { translate( 'Starting at' ) } </span>
					<span className="design-type-with-store__price"> <b>{ getPrice() }</b>/mo </span>

					<Button
						primary
						className="design-type-with-store__form-submit"
						target="_blank"
						href={ partnerUrl }
						onClick={ () => recordPartnerClick( partnerName ) }
					>
						{ translate( 'Create Store' ) }
					</Button>
				</div>
			</div>

			<div className="design-type-with-store__back-button-wrapper">
				<Button compact borderless onClick={ onBackClick }>
					<Gridicon icon="arrow-left" size={ 18 } />
					{ translate( 'Back' ) }
				</Button>
			</div>
		</div>
	);
};

BluehostStoreStep.displayName = 'BluehostStoreStep';

BluehostStoreStep.propTypes = {
	onBackClick: PropTypes.func,
	translate: PropTypes.func,
	recordPartnerClick: PropTypes.func,
	partnerName: PropTypes.string,
	partnerUrl: PropTypes.string
};

BluehostStoreStep.defaultProps = {
	onBackClick: identity,
	translate: identity,
	recordPartnerClick: identity,
	partnerName: 'Bluehost',
	partnerUrl: 'https://www.bluehost.com/wordpress'
};

const mapDispatchToProps = dispatch => ( {
	recordPartnerClick: partnerName =>
		dispatch( recordTracksEvent( 'calypso_triforce_partner_redirect', { 'partner_name': partnerName } ) )
} );

export default connect( null, mapDispatchToProps )( localize( BluehostStoreStep ) );
