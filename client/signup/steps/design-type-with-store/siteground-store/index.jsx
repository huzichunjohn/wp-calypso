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
import { localize } from 'i18n-calypso';
import { recordTracksEvent } from 'state/analytics/actions';

import SitegroundLogo from './siteground-logo';

export const SitegroundStoreStep = ( { onBackClick, translate, recordPartnerClick } ) => (
	<div>
		<StepHeader
			headerText={ translate( 'Create a WordPress Store' ) }
			subHeaderText={ translate( 'Our partners at SiteGround and WooCommerce are here for you' ) }
		/>

		<div className="design-type-with-store__container">
			<div className="design-type-with-store__copy">
				<SitegroundLogo />
				<div className="design-type-with-store__text">
					{ translate(
						'We\'ve partnered with SiteGround, a top-notch WordPress hosts ' +
						'with a knack for building great e-commerce stores using WooCommerce.'
					) }
				</div>
			</div>

			<div className="design-type-with-store__form">
				<span className="design-type-with-store__price-text"> { translate( 'Starting at' ) } </span>
				<span className="design-type-with-store__price"> <b>$3.95</b>/mo </span>
				<Button
					primary
					className="design-type-with-store__form-submit"
					target="_blank"
					href="https://www.siteground.com/woocommerce/step1.htm"
					onClick={ recordPartnerClick }
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

SitegroundStoreStep.displayName = 'SitegroundStoreStep';

SitegroundStoreStep.propTypes = {
	onBackClick: PropTypes.func,
	translate: PropTypes.func,
	recordPartnerClick: PropTypes.func
};

SitegroundStoreStep.defaultProps = {
	onBackClick: identity,
	translate: identity,
	recordPartnerClick: identity
};

const mapDispatchToProps = dispatch => ( {
	recordPartnerClick: () =>
		dispatch( recordTracksEvent( 'calypso_triforce_partner_redirect', { 'partner_name': 'SiteGround' } ) )
} );

export default connect( null, mapDispatchToProps )( localize( SitegroundStoreStep ) );
