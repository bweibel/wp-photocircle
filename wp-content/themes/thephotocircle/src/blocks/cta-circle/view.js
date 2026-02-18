/**
 * CTA Circle — scroll-driven horizontal parallax animation.
 *
 * Directly transforms the three SVG circles based on scroll position.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll(
		'.wp-block-thephotocircle-cta-circle'
	);

	if ( ! blocks.length ) {
		return;
	}

	// Speed multipliers for each circle (px at full progress).
	const speeds = [ 30, -20, 14 ];

	// Gather circle elements for each block.
	const blockData = [];
	blocks.forEach( ( block ) => {
		const circles = block.querySelectorAll(
			'.cta-circle-decoration circle'
		);
		if ( circles.length ) {
			blockData.push( { el: block, circles } );
		}
	} );

	if ( ! blockData.length ) {
		return;
	}

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				entry.target._inView = entry.isIntersecting;
			} );
		},
		{ threshold: 0 }
	);

	blockData.forEach( ( { el } ) => {
		el._inView = false;
		observer.observe( el );
	} );

	let ticking = false;

	function update() {
		const viewH = window.innerHeight;

		blockData.forEach( ( { el, circles } ) => {
			if ( ! el._inView ) {
				return;
			}

			const rect = el.getBoundingClientRect();

			// -1 → 1 range, 0 when block is centred in viewport.
			const raw =
				( viewH / 2 - ( rect.top + rect.height / 2 ) ) /
				( viewH / 2 );
			const progress = Math.max( -1, Math.min( 1, raw ) );

			circles.forEach( ( circle, i ) => {
				const px = progress * ( speeds[ i ] || 0 );
				circle.setAttribute(
					'transform',
					`translate(${ px.toFixed( 2 ) }, 0)`
				);
			} );
		} );

		ticking = false;
	}

	function onScroll() {
		if ( ! ticking ) {
			ticking = true;
			requestAnimationFrame( update );
		}
	}

	window.addEventListener( 'scroll', onScroll, { passive: true } );
	update();
} );
