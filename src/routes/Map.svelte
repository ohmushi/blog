<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import mapConfig from './map.config';

	let map: mapboxgl.Map;
	let mapContainer: HTMLElement;

	const mapbox_api_key = `${import.meta.env.VITE_MAPBOX_API_KEY}`;

	onMount(() => {
		mapboxgl.accessToken = mapbox_api_key;
		map = new mapboxgl.Map(mapConfig(mapContainer));

		map.on('load', () => {
			map.addSource('corrode', {
				type: 'image',
				url: 'https://cms.tracker.gg/content/images/2025/06/image-6.png',
				coordinates: [
					[-10, 10],  // top-left
					[10, 10],   // top-right
					[10, -10],  // bottom-right
					[-10, -10]  // bottom-left
				]
			})
			map.addLayer({
				id: 'corrode',
				type: 'raster',
				source: 'corrode',
			})

			map.addSource('places', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {
								title: 'Projects',
								slug: '/projects',
								kind: 'project'
							},
							geometry: {
								type: 'Point',
								coordinates: [-4, 2]
							}
						},
						{
							type: 'Feature',
							properties: {
								title: 'Thoughts',
								slug: '/thoughts',
								kind: 'thought'
							},
							geometry: {
								type: 'Point',
								coordinates: [1, -1]
							}
						},
						{
							type: 'Feature',
							properties: {
								title: 'Experiments',
								slug: '/experiments',
								kind: 'experiment'
							},
							geometry: {
								type: 'Point',
								coordinates: [5, 3]
							}
						}
					]
				}
			});

			map.addLayer({
				id: 'places-layer',
				type: 'circle',
				source: 'places',
				paint: {
					'circle-radius': 8,
					'circle-color': [
						'match',
						['get', 'kind'],
						'project', '#2f6fed',
						'thought', '#222222',
						'experiment', '#e85d04',
						'#666666'
					],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#ffffff'
				}
			});

			map.addControl(new mapboxgl.FullscreenControl());

			map.on('click', 'places-layer', (e) => {
				const feature = e.features?.[0];
				const slug = feature?.properties?.slug;
				if (slug) {
					window.location.href = slug;
				}
			});

			map.on('mouseenter', 'places-layer', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'places-layer', () => {
				map.getCanvas().style.cursor = '';
			});

		} )
	});


	onDestroy(() => {
		map?.remove();
	});
</script>

<div id='map-container' bind:this={mapContainer}></div>

<style>
    #map-container {
        width: 100%;
        height: 100%;
    }

    /*noinspection ALL*/
    :global(.mapboxgl-ctrl-logo){
        display: none !important;
    }
</style>