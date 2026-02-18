import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, url, image, overlay } = attributes;

	const blockProps = useBlockProps.save( {
		className: `is-overlay-${ overlay }`,
		href: url || undefined,
	} );

	const Tag = url ? 'a' : 'div';

	return (
		<Tag { ...blockProps }>
			{ image?.url && (
				<img
					className="cta-image-card__img"
					src={ image.url }
					alt={ image.alt || '' }
				/>
			) }
			<span className="cta-image-card__overlay" aria-hidden="true" />
			<RichText.Content
				tagName="span"
				className="cta-image-card__text"
				value={ text }
			/>
		</Tag>
	);
}
