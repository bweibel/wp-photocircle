import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	Button,
	Placeholder,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, url, image, overlay } = attributes;

	const blockProps = useBlockProps( {
		className: `is-overlay-${ overlay }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Card Settings', 'thephotocircle' ) }>
					<SelectControl
						label={ __( 'Overlay', 'thephotocircle' ) }
						value={ overlay }
						options={ [
							{ label: __( 'None (image only)', 'thephotocircle' ), value: 'none' },
							{ label: __( 'Brand (Yellow)', 'thephotocircle' ), value: 'brand' },
							{ label: __( 'Dark', 'thephotocircle' ), value: 'dark' },
						] }
						onChange={ ( value ) =>
							setAttributes( { overlay: value } )
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
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									image: {
										id: media.id,
										url: media.url,
										alt: media.alt,
									},
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ image?.id }
							render={ ( { open } ) => (
								<>
									{ image?.url && (
										<img
											src={ image.url }
											alt={ image.alt || '' }
											style={ {
												width: '100%',
												maxHeight: '120px',
												objectFit: 'cover',
												borderRadius: '4px',
												marginBottom: '8px',
											} }
										/>
									) }
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ image?.url
											? __( 'Replace Image', 'thephotocircle' )
											: __( 'Select Image', 'thephotocircle' )
										}
									</Button>
									{ image?.url && (
										<Button
											isDestructive
											variant="tertiary"
											onClick={ () =>
												setAttributes( { image: {} } )
											}
											style={ { marginLeft: '8px' } }
										>
											{ __( 'Remove', 'thephotocircle' ) }
										</Button>
									) }
								</>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ image?.url ? (
					<img
						className="cta-image-card__img"
						src={ image.url }
						alt={ image.alt || '' }
					/>
				) : (
					<Placeholder
						icon="format-image"
						label={ __( 'Background Image', 'thephotocircle' ) }
						instructions={ __(
							'Select an image in the sidebar.',
							'thephotocircle'
						) }
					/>
				) }
				<span className="cta-image-card__overlay" aria-hidden="true" />
				<RichText
					tagName="span"
					className="cta-image-card__text"
					value={ text }
					onChange={ ( value ) =>
						setAttributes( { text: value } )
					}
					placeholder={ __( 'Card title…', 'thephotocircle' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
