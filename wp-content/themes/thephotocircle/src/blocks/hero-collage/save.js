import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { circleImageLg, circleImageSm, slideImages, headline, subheadlines } =
		attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ /* Large circle image */ }
			{ circleImageLg?.url && (
				<div className="hero-collage-circle hero-collage-circle--lg">
					<img
						src={ circleImageLg.url }
						alt={ circleImageLg.alt || '' }
						className="hero-collage-circle__img"
					/>
				</div>
			) }

			{ /* Main slideshow area */ }
			<div className="hero-collage-main">
				{ slideImages?.length > 0 &&
					slideImages.map( ( img, index ) => (
						<img
							key={ img.id }
							src={ img.url }
							alt={ img.alt || '' }
							className={ `hero-collage-slide${
								index === 0 ? ' is-active' : ''
							}` }
							data-slide-index={ index }
						/>
					) ) }

				{ ( headline || subheadlines?.length > 0 ) && (
					<div className="hero-collage-text">
						{ headline && (
							<RichText.Content
								tagName="h1"
								className="hero-collage-headline"
								value={ headline }
							/>
						) }
						{ subheadlines?.length > 0 && (
							<div className="hero-collage-subheadlines">
								{ subheadlines.map( ( text, index ) => (
									<p
										key={ index }
										className={ `hero-collage-subheadline${
											index === 0 ? ' is-active' : ''
										}` }
										data-text-index={ index }
									>
										{ text }
									</p>
								) ) }
							</div>
						) }
					</div>
				) }
			</div>

			{ /* Small circle image */ }
			{ circleImageSm?.url && (
				<div className="hero-collage-circle hero-collage-circle--sm">
					<img
						src={ circleImageSm.url }
						alt={ circleImageSm.alt || '' }
						className="hero-collage-circle__img"
					/>
				</div>
			) }
		</div>
	);
}

// Deprecated: migrate single subheadline string → subheadlines array
export const deprecated = [
	{
		attributes: {
			circleImageLg: { type: 'object', default: {} },
			circleImageSm: { type: 'object', default: {} },
			slideImages: { type: 'array', default: [] },
			headline: { type: 'string', default: '' },
			subheadline: { type: 'string', default: '' },
		},
		migrate( attributes ) {
			const { subheadline, ...rest } = attributes;
			return {
				...rest,
				subheadlines: subheadline ? [ subheadline ] : [],
			};
		},
		save( { attributes } ) {
			const { circleImageLg, circleImageSm, slideImages, headline, subheadline } =
				attributes;

			const blockProps = useBlockProps.save();

			return (
				<div { ...blockProps }>
					{ circleImageLg?.url && (
						<div className="hero-collage-circle hero-collage-circle--lg">
							<img
								src={ circleImageLg.url }
								alt={ circleImageLg.alt || '' }
								className="hero-collage-circle__img"
							/>
						</div>
					) }

					<div className="hero-collage-main">
						{ slideImages?.length > 0 &&
							slideImages.map( ( img, index ) => (
								<img
									key={ img.id }
									src={ img.url }
									alt={ img.alt || '' }
									className={ `hero-collage-slide${
										index === 0 ? ' is-active' : ''
									}` }
									data-slide-index={ index }
								/>
							) ) }

						{ ( headline || subheadline ) && (
							<div className="hero-collage-text">
								{ headline && (
									<RichText.Content
										tagName="h1"
										className="hero-collage-headline"
										value={ headline }
									/>
								) }
								{ subheadline && (
									<RichText.Content
										tagName="p"
										className="hero-collage-subheadline"
										value={ subheadline }
									/>
								) }
							</div>
						) }
					</div>

					{ circleImageSm?.url && (
						<div className="hero-collage-circle hero-collage-circle--sm">
							<img
								src={ circleImageSm.url }
								alt={ circleImageSm.alt || '' }
								className="hero-collage-circle__img"
							/>
						</div>
					) }
				</div>
			);
		},
	},
];
