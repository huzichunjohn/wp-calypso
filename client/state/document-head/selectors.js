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
