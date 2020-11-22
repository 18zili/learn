<template>
  <div>
    detail id: {{ $route.params.id }} page
    <p>{{ goodInfo.id }} -- {{ goodInfo.name }} -- {{ goodInfo.price }}</p>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      goodInfo: {}
    };
  },
  async asyncData({ $axios, params, error }) {
    const { ok, data: goodInfo } = await $axios.$get("/api/detail", { params });
    if (ok) {
      return {
        goodInfo
      };
    }
  }
};
</script>
