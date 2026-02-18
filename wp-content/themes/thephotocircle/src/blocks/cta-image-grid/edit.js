import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'thephotocircle/cta-image-card' ];

const TEMPLATE = [
	[ 'thephotocircle/cta-image-card', { overlay: 'none' } ],
	[ 'thephotocircle/cta-image-card', { overlay: 'brand' } ],
	[ 'thephotocircle/cta-image-card', { overlay: 'none' } ],
	[ 'thephotocircle/cta-image-card', { overlay: 'dark' } ],
];

export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
	} );

	return <div { ...innerBlocksProps } />;
}
