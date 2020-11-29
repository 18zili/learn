<template>
	<div class="about">
		<button v-permission="['admin', 'editor']">editor button</button>
		<button v-permission="['admin']">admin button</button>
	</div>
</template>
