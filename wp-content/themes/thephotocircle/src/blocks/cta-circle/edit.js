import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import CircleDecoration from './circles';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, url, variant } = attributes;

	const blockProps = useBlockProps( {
		className: `is-style-${ variant }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'CTA Settings', 'thephotocircle' ) }>
					<SelectControl
						label={ __( 'Variant', 'thephotocircle' ) }
						value={ variant }
						options={ [
							{ label: __( 'Dark', 'thephotocircle' ), value: 'dark' },
							{ label: __( 'Brand (Yellow)', 'thephotocircle' ), value: 'brand' },
						] }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<TextControl
						label={ __( 'Link URL', 'thephotocircle' ) }
						value={ url }
						onChange={ ( value ) =>
							setAttributes( { url: value } )
						}
						placeholder="https://"
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<CircleDecoration />
				<RichText
					tagName="span"
					className="cta-circle-text"
					value={ text }
					onChange={ ( value ) =>
						setAttributes( { text: value } )
					}
					placeholder={ __( 'Button text…', 'thephotocircle' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
