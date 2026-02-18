/**
 * Hero Collage — front-end slideshow for images and rotating subheadlines.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	document
		.querySelectorAll( '.wp-block-thephotocircle-hero-collage' )
		.forEach( ( block ) => {
			const slides = block.querySelectorAll( '.hero-collage-slide' );
			const texts = block.querySelectorAll( '.hero-collage-subheadline' );

			// Image slideshow
			if ( slides.length >= 2 ) {
				let currentSlide = 0;
				setInterval( () => {
					slides[ currentSlide ].classList.remove( 'is-active' );
					currentSlide = ( currentSlide + 1 ) % slides.length;
					slides[ currentSlide ].classList.add( 'is-active' );
				}, 5000 );
			}

			// Rotating subheadlines
			if ( texts.length >= 2 ) {
				let currentText = 0;
				setInterval( () => {
					texts[ currentText ].classList.remove( 'is-active' );
					currentText = ( currentText + 1 ) % texts.length;
					texts[ currentText ].classList.add( 'is-active' );
				}, 5000 );
			}
		} );
} );
