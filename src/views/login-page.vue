<template>
  <section class="login-page">
    <main>
      <h2>{{mainHeader}}</h2>
      <input v-if="!isLogin" v-model="credentials.fullname" type="text" placeholder="Full Name">
      <input type="text" v-model="credentials.email" placeholder="Email" />
      <input type="password" v-model="credentials.password" placeholder="Password" />
      <input v-if="!isLogin" type="password" v-model="credentials.passwordConfirm" placeholder="Confirm Password">
      
      <button @click="sendCreds">{{mainBtn}}</button>
    </main>
    <aside>
      <h2>{{sideHeader}}</h2>
      <p>{{sideTxt}}</p>
      <button @click="toggleLogin">{{sideBtn}}</button>
    </aside>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      credentials:{
        fullname:'',
        email:'',
        password:'',
        passwordConfirm:''
      }
    };
  },
  methods:{
    toggleLogin(){
      this.isLogin = !this.isLogin
    },
    sendCreds(){
      if(this.isLogin){
        console.log('logged in');
      } else {
        console.log('signed up');
      }
    }
  },
  computed: {
    mainBtn() {
      return this.isLogin ? 'Sign In' : 'Sign Up'
    },
    sideBtn(){
      return this.isLogin ? 'Sign Up' : 'Sign In'
    },
    mainHeader(){
      return this.isLogin ? 'Login to Your Account' : 'Create Your Account'
    },
    sideHeader(){
      return this.isLogin ? 'New Here?' : 'Have an Account'
    },
    sideTxt(){
      return this.isLogin ? 'Sign up and discover how easy you can manage your life' : ''
    }
  },
};
</script>