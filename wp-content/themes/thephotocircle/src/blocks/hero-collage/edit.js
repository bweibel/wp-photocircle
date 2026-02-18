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
	const { circleImageLg, circleImageSm, slideImages, headline, subheadline } =
		attributes;

	const blockProps = useBlockProps();

	const firstSlide = slideImages?.length > 0 ? slideImages[ 0 ] : null;

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
						<RichText
							tagName="p"
							className="hero-collage-subheadline"
							value={ subheadline }
							onChange={ ( value ) =>
								setAttributes( { subheadline: value } )
							}
							placeholder={ __(
								'in community',
								'thephotocircle'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
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
