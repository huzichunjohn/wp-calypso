/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import { decodeEntities } from 'lib/formatting';
import { getSelectedSite, getGroupName } from 'state/ui/selectors';

/**
 * Returns the document title as set by the DocumentHead component or setTitle
 * action.
 *
 * @param  {Object}  state  Global state tree
 * @return {?String}        Document title
 */
export function getTitle( state ) {
	return state.documentHead.title;
}

/**
 * Returns a count reflecting unread items.
 *
 * @param  {Object}  state  Global state tree
 * @return {?String}        Unread count (string because it can be e.g. '40+')
 */
export function getUnreadCount( state ) {
	return state.documentHead.unreadCount;
}

export function getFormattedTitle( state ) {
	const siteSpecificGroups = [ 'sites', 'editor' ];
	const title = getTitle( state );
	const unreadCount = getUnreadCount( state );
	const site = getSelectedSite( state );

	let pageTitle = '';

	if ( unreadCount ) {
		pageTitle += '(' + unreadCount + ') ';
	}

	pageTitle += title;

	// Display site name as title part only if we're in 'My Sites'
	if ( includes( siteSpecificGroups, getGroupName( state ) ) && site ) {
		pageTitle = appendSite( pageTitle, site );
	}

	if ( pageTitle ) {
		pageTitle = decodeEntities( pageTitle ) + ' — WordPress.com';
	} else {
		pageTitle = 'WordPress.com';
	}

	return pageTitle;
}

function appendSite( title, site ) {
	let siteName;

	if ( site.name ) {
		siteName = site.name;
	} else {
		siteName = site.domain;
	}

	if ( title ) {
		return title + ' \u2039 ' + siteName;
	}

	return siteName;
}
