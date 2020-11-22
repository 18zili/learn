<template>
  <div class="container">
    <ul>
      <li v-for="good in goods" :key="good.id">
        <nuxt-link :to="'detail/' + good.id">
          id: {{ good.id }} -- {{ good.name }} -- $ {{ good.price }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "首页"
    };
  },
  data() {
    return {
      goods: []
    };
  },
  async asyncData({ $axios, error }) {
    const { ok, goods } = await $axios.$get("/api/goods");
    if (ok) {
      // 这里返回的数据会和data进行合并
      return { goods };
    }
    error({ statusCode: 400, message: "error" });
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
