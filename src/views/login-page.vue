<template>
  <section class="login-page">
    <main>
      <form @submit.prevent="sendCreds">
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
    };
  },
  methods: {
    toggleLogin() {
      this.isLogin = !this.isLogin;
    },
    sendCreds() {
      if (this.isLogin) {
        this.login()
      } else {
        if (!this.checkPass()) return
        console.log('passed check')
        this.signup()
      }
    },
    async login(creds) {
      const { email, password } = this.creds
      this.isLoading = true
      try {
        const user = await this.$store.dispatch({
          type: "login",
          userCreds: { email, password },
        });
        console.log("login", user);
        this.resetCreds();
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async signup() {
      console.log('signup');
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          userCreds: { ...this.creds },
        });
        console.log("signup", user);
        this.resetCreds();
      } catch (err) {
        console.log(err, "Failed to signup");
      }
    },
    checkPass() {
      console.log(this.creds.password === this.creds.passwordConfirm)
      return this.creds.password === this.creds.passwordConfirm
    },
    resetCreds(){
      this.creds = {
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }
    }
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
};
</script>