/**
 * Decorative circle shapes for the CTA block.
 */
export default function CircleDecoration() {
	return (
		<svg
			className="cta-circle-decoration"
			aria-hidden="true"
			width="100"
			height="80"
			viewBox="0 0 100 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{ /* Small filled circle */ }
			<circle cx="18" cy="52" r="8" fill="currentColor" />
			{ /* Medium ring */ }
			<circle cx="38" cy="30" r="16" stroke="currentColor" strokeWidth="3" fill="none" />
			{ /* Large ring */ }
			<circle cx="72" cy="28" r="26" stroke="currentColor" strokeWidth="3" fill="none" />
		</svg>
	);
}
