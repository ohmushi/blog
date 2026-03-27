const mapConfig = (container: HTMLElement): mapboxgl.MapOptions => ({
	container: container,
	center: [0, 0],
	zoom: 6,
	minZoom: 3,
	maxZoom: 8,
	renderWorldCopies: false,
	projection: 'mercator',
	style: {
		version: 8,
		sources: {},
		layers: [
			{
				id: 'background',
				type: 'background',
				paint: {
					'background-color': '#111111'
				}
			}
		]
	} satisfies mapboxgl.StyleSpecification,
	attributionControl: false
});

export default mapConfig;
