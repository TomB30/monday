<template>
  <header class="app-header">
      <nav class="main-navbar">
          <div class="upper-links">
              <router-link title="Home Page" to="/" class="navbar-icon-link"><img class="monday-logo" src="@/assets/icons/monday-logo.png" alt=""><div></div></router-link>
              <router-link title="Workspace" to="/workspace" class="navbar-icon-link selected"><img src="@/assets/icons/squares-icon.png" alt=""><div></div></router-link>
              <router-link title="About Page" to="/about" class="navbar-icon-link"><img src="@/assets/icons/ring-icon.png" alt=""><div></div></router-link>
          </div>
          <div class="lower-links">
              <router-link title="Login Page" to="/login" class="navbar-icon-link"><img src="@/assets/icons/inbox-icon.png" alt=""><div></div></router-link>
          </div>
      </nav>
  </header>
</template>

<script>
export default {

}
</script>