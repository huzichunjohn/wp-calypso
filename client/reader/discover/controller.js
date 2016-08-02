/**
 * External dependencies
 */
import React from 'react';
import ReactDom from 'react-dom';

/**
 * Internal dependencies
 */
import config from 'config';
import route from 'lib/route';
import { setDocumentHeadTitle as setTitle } from 'state/document-head/actions';
import feedStreamFactory from 'lib/feed-stream-store';
import { recordTrack } from 'reader/stats';
import { ensureStoreLoading, trackPageLoad, trackUpdatesLoaded, trackScrollPage } from 'reader/controller-helper';

const ANALYTICS_PAGE_TITLE = 'Reader';

export default {
	discover( context ) {
		var blogId = config( 'discover_blog_id' ),
			SiteStream = require( 'reader/site-stream' ),
			basePath = route.sectionify( context.path ),
			fullAnalyticsPageTitle = ANALYTICS_PAGE_TITLE + ' > Site > ' + blogId,
			feedStore = feedStreamFactory( 'site:' + blogId ),
			mcKey = 'discover';

		context.store.dispatch( setTitle( 'Discover' ) ); // FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.

		ensureStoreLoading( feedStore, context );

		trackPageLoad( basePath, fullAnalyticsPageTitle, mcKey );
		recordTrack( 'calypso_reader_discover_viewed' );

		ReactDom.render(
			React.createElement( SiteStream, {
				key: 'site-' + blogId,
				store: feedStore,
				siteId: blogId,
				trackScrollPage: trackScrollPage.bind(
					null,
					basePath,
					fullAnalyticsPageTitle,
					ANALYTICS_PAGE_TITLE,
					mcKey
				),
				onUpdatesShown: trackUpdatesLoaded.bind( null, mcKey ),
				suppressSiteNameLink: true,
				showBack: false
			} ),
			document.getElementById( 'primary' )
		);
	}
};
