'use strict';

( ( /** @type {Window} */ w ) =>
{
	const FUNCTION_NAME = 'trustedTypes';
	const POLICY_NAME = 'default';

	const sanitizeFunction = function ( /** @type {String} */ str )
	{
		const ALLOWED_DOMAINS = [ 'iiic.dev' ];

		if ( str.substring( 0, 4 ) === 'http' ) {
			const url = new URL( str );
			if ( !ALLOWED_DOMAINS.includes( url.hostname ) ) {
				throw new Error( 'Cannot load scripts via absolute path' );
			}
		}

		return str + '?' + POLICY_NAME + '-policy-used';
	}

	if ( typeof w[ FUNCTION_NAME ] !== 'undefined' && w[ FUNCTION_NAME ] && w[ FUNCTION_NAME ].createPolicy ) {
		w[ FUNCTION_NAME ].createPolicy( POLICY_NAME, {
			createScriptURL: sanitizeFunction.bind( this )
		} );
	} else {
		w[ FUNCTION_NAME ] = {};
		w[ FUNCTION_NAME ][ POLICY_NAME + 'Policy' ] = {
			createScriptURL: sanitizeFunction.bind( this )
		};
	}

} )( window );
