<template>
  <div>
    <h2>登录</h2>
    <input v-model="user.username" placeholder="用户名" />
    <input type="password" v-model="user.password" placeholder="密码" />
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  layout: "blink",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async onLogin() {
      const ok = await this.$store.dispatch("user/login", this.user);
      if (ok) {
        const redirect = this.$route.query.redirect || "/";
        this.$router.push(redirect);
      }
    }
  }
};
</script>
