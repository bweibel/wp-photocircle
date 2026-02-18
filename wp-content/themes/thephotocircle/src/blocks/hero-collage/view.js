/**
 * Hero Collage — front-end crossfade slideshow.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	document
		.querySelectorAll( '.wp-block-thephotocircle-hero-collage' )
		.forEach( ( block ) => {
			const slides = block.querySelectorAll( '.hero-collage-slide' );
			if ( slides.length < 2 ) {
				return;
			}

			let current = 0;
			const interval = 5000;

			setInterval( () => {
				slides[ current ].classList.remove( 'is-active' );
				current = ( current + 1 ) % slides.length;
				slides[ current ].classList.add( 'is-active' );
			}, interval );
		} );
} );
