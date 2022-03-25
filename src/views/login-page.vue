<template>
  <section class="login-page">
    <main>
      <form @submit.prevent="sendCreds" v-if="!loggedUser">
        <h2>{{ mainHeader }}</h2>
        <input
          v-if="!isLogin"
          required
          v-model="creds.fullname"
          type="text"
          placeholder="Full Name"
        />
        <input
          type="email"
          required
          v-model="creds.email"
          placeholder="Email"
        />
        <input
          type="password"
          required
          v-model="creds.password"
          placeholder="Password"
        />
        <input
          v-if="!isLogin"
          required
          type="password"
          v-model="creds.passwordConfirm"
          placeholder="Confirm Password"
        />
        <button>{{ mainBtn }}</button>
      </form>
      <template v-else>
        <h2>Welcome {{ loggedUser.fullname }}</h2>
        <button @click="logout">Logout</button>
      </template>
    </main>
    <aside>
      <h2>{{ sideHeader }}</h2>
      <p>{{ sideTxt }}</p>
      <button @click="toggleLogin">{{ sideBtn }}</button>
    </aside>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isLogin: true,
      creds: {
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      loggedUser: null,
    };
  },
  methods: {
    toggleLogin() {
      this.isLogin = !this.isLogin;
    },
    sendCreds() {
      if (this.isLogin) {
        this.login();
      } else {
        if (!this.checkPass()) return;
        this.signup();
      }
    },
    async login() {
      this.isLoading = true;
      try {
        const user = await this.$store.dispatch({
          type: "login",
          userCreds: { ...this.creds },
        });
        this.resetCreds();
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async signup() {
      this.isLoading = true;
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          userCreds: { ...this.creds },
        });
        this.resetCreds();
      } catch (err) {
        console.log(err, "Failed to signup");
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
      } catch (err) {
        console.log(err, "failed to logout");
      }
    },
    checkPass() {
      console.log(this.creds.password === this.creds.passwordConfirm);
      return this.creds.password === this.creds.passwordConfirm;
    },
    resetCreds() {
      this.creds = {
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      };
    },
  },
  computed: {
    mainBtn() {
      return this.isLogin ? "Sign In" : "Sign Up";
    },
    sideBtn() {
      return this.isLogin ? "Sign Up" : "Sign In";
    },
    mainHeader() {
      return this.isLogin ? "Login to Your Account" : "Create Your Account";
    },
    sideHeader() {
      return this.isLogin ? "New Here?" : "Have an Account";
    },
    sideTxt() {
      return this.isLogin
        ? "Sign up and discover how easy you can manage your life"
        : "";
    },
  },
  watch: {
    "$store.getters.loggedInUser": {
      handler(newVal) {
        this.loggedUser = newVal;
      },
      immediate: true,
    },
  },
};
</script>