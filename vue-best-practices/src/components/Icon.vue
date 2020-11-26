<template>
	<svg :class="svgClass" v-on="$listeners">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		iconClass: {
			type: String,
			required: true,
		},
		className: {
			type: String,
			default: '',
		},
	},
	computed: {
		iconName() {
			return `#icon-${this.iconClass}`;
		},
		svgClass() {
			return 'svg-icon ' + this.className;
		},
	},
};
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
