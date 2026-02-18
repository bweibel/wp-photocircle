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
	Button,
	Placeholder,
	TextControl,
} from '@wordpress/components';
import './editor.scss';

function ImageSlot( { label, image, onSelect, onRemove } ) {
	return (
		<div className="hero-collage-image-slot">
			<p className="hero-collage-image-slot__label">{ label }</p>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ [ 'image' ] }
					value={ image?.id }
					render={ ( { open } ) =>
						image?.url ? (
							<div className="hero-collage-image-slot__preview">
								<img src={ image.url } alt={ image.alt || '' } />
								<Button
									variant="secondary"
									onClick={ open }
									size="small"
								>
									{ __( 'Replace', 'thephotocircle' ) }
								</Button>
								<Button
									isDestructive
									variant="tertiary"
									onClick={ onRemove }
									size="small"
								>
									{ __( 'Remove', 'thephotocircle' ) }
								</Button>
							</div>
						) : (
							<Button variant="secondary" onClick={ open }>
								{ __( 'Select Image', 'thephotocircle' ) }
							</Button>
						)
					}
				/>
			</MediaUploadCheck>
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { circleImageLg, circleImageSm, slideImages, headline, subheadlines } =
		attributes;

	const blockProps = useBlockProps();

	const firstSlide = slideImages?.length > 0 ? slideImages[ 0 ] : null;

	const updateSubheadline = ( index, value ) => {
		const updated = [ ...subheadlines ];
		updated[ index ] = value;
		setAttributes( { subheadlines: updated } );
	};

	const addSubheadline = () => {
		setAttributes( { subheadlines: [ ...( subheadlines || [] ), '' ] } );
	};

	const removeSubheadline = ( index ) => {
		const updated = subheadlines.filter( ( _, i ) => i !== index );
		setAttributes( { subheadlines: updated } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Circle Images', 'thephotocircle' ) }
				>
					<ImageSlot
						label={ __( 'Large Circle', 'thephotocircle' ) }
						image={ circleImageLg }
						onSelect={ ( media ) =>
							setAttributes( {
								circleImageLg: {
									id: media.id,
									url: media.url,
									alt: media.alt,
								},
							} )
						}
						onRemove={ () =>
							setAttributes( { circleImageLg: {} } )
						}
					/>
					<ImageSlot
						label={ __( 'Small Circle', 'thephotocircle' ) }
						image={ circleImageSm }
						onSelect={ ( media ) =>
							setAttributes( {
								circleImageSm: {
									id: media.id,
									url: media.url,
									alt: media.alt,
								},
							} )
						}
						onRemove={ () =>
							setAttributes( { circleImageSm: {} } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Slideshow Images', 'thephotocircle' ) }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									slideImages: media.map( ( img ) => ( {
										id: img.id,
										url: img.url,
										alt: img.alt,
									} ) ),
								} )
							}
							allowedTypes={ [ 'image' ] }
							multiple
							gallery
							value={ slideImages?.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<>
									{ slideImages?.length > 0 && (
										<div className="hero-collage-gallery-preview">
											{ slideImages.map( ( img ) => (
												<img
													key={ img.id }
													src={ img.url }
													alt={ img.alt || '' }
												/>
											) ) }
										</div>
									) }
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ slideImages?.length > 0
											? __( 'Edit Gallery', 'thephotocircle' )
											: __( 'Add Slideshow Images', 'thephotocircle' )
										}
									</Button>
								</>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody
					title={ __( 'Rotating Subheadlines', 'thephotocircle' ) }
				>
					{ ( subheadlines || [] ).map( ( text, index ) => (
						<div
							key={ index }
							className="hero-collage-subheadline-row"
						>
							<TextControl
								value={ text }
								onChange={ ( value ) =>
									updateSubheadline( index, value )
								}
								placeholder={ __(
									'Subheadline text…',
									'thephotocircle'
								) }
							/>
							<Button
								icon="no-alt"
								isDestructive
								label={ __( 'Remove', 'thephotocircle' ) }
								onClick={ () => removeSubheadline( index ) }
								size="small"
							/>
						</div>
					) ) }
					<Button
						variant="secondary"
						onClick={ addSubheadline }
					>
						{ __( 'Add Subheadline', 'thephotocircle' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ /* Large circle */ }
				<div className="hero-collage-circle hero-collage-circle--lg">
					{ circleImageLg?.url ? (
						<img
							src={ circleImageLg.url }
							alt={ circleImageLg.alt || '' }
						/>
					) : (
						<Placeholder
							icon="format-image"
							label={ __( 'Large Circle', 'thephotocircle' ) }
						/>
					) }
				</div>

				{ /* Main slideshow area */ }
				<div className="hero-collage-main">
					{ firstSlide ? (
						<img
							className="hero-collage-slide is-active"
							src={ firstSlide.url }
							alt={ firstSlide.alt || '' }
						/>
					) : (
						<Placeholder
							icon="format-gallery"
							label={ __(
								'Slideshow Images',
								'thephotocircle'
							) }
							instructions={ __(
								'Add images via the sidebar panel.',
								'thephotocircle'
							) }
						/>
					) }

					<div className="hero-collage-text">
						<RichText
							tagName="h1"
							className="hero-collage-headline"
							value={ headline }
							onChange={ ( value ) =>
								setAttributes( { headline: value } )
							}
							placeholder={ __(
								'CREATING CONNECTIONS',
								'thephotocircle'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
						{ subheadlines?.length > 0 ? (
							<p className="hero-collage-subheadline">
								{ subheadlines[ 0 ] }
							</p>
						) : (
							<p className="hero-collage-subheadline hero-collage-subheadline--placeholder">
								{ __( 'Add subheadlines in sidebar →', 'thephotocircle' ) }
							</p>
						) }
					</div>
				</div>

				{ /* Small circle */ }
				<div className="hero-collage-circle hero-collage-circle--sm">
					{ circleImageSm?.url ? (
						<img
							src={ circleImageSm.url }
							alt={ circleImageSm.alt || '' }
						/>
					) : (
						<Placeholder
							icon="format-image"
							label={ __( 'Small Circle', 'thephotocircle' ) }
						/>
					) }
				</div>
			</div>
		</>
	);
}
