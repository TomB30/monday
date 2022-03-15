<template>
  <section class="home-page">
    <h2>Manage everything in one place</h2>
    <img src="@/assets/imgs/img1.png" alt="" />
    <button
      :style="btnBg"
      @click="login"
      @mouseleave="mouseOut"
      @mousemove="mouseMove"
    >
      Start as a guest
    </button>
    <router-link to="/login">Sign in</router-link>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      x: 0,
    };
  },
  methods: {
    mouseMove(ev) {
      const { left, width } = ev.target.getBoundingClientRect();
      this.x = ((ev.clientX - left) / width) * 100;
    },
    mouseOut() {
      this.x = 0;
    },
    async login() {
      const user = await this.$store.dispatch({
        type: "login",
        userCreds: { email: "guest@guest.com", password: "guest" },
      })
      this.$router.push('/workspace')
    },
  },
  computed: {
    btnBg() {
      if (!this.x) return { "background-color": "#292f4c" };
      return {
        background: `linear-gradient(90deg, rgba(41,47,76,1) 0%, rgba(61,148,132,1) ${this.x}%, rgba(41,47,76,1) 100%)`,
      };
    },
  },
  components: {},
};
</script>
