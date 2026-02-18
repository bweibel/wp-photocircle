import { useBlockProps, RichText } from '@wordpress/block-editor';
import CircleDecoration from './circles';

export default function save( { attributes } ) {
	const { text, url, variant } = attributes;

	const blockProps = useBlockProps.save( {
		className: `is-style-${ variant }`,
		href: url || undefined,
	} );

	const Tag = url ? 'a' : 'div';

	return (
		<Tag { ...blockProps }>
			<CircleDecoration />
			<RichText.Content
				tagName="span"
				className="cta-circle-text"
				value={ text }
			/>
		</Tag>
	);
}
