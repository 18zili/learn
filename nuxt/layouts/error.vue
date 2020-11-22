<template>
  <div>
    {{ error }}
    <p>
      <nuxt-link to="/">to home</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>
