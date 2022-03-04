<template>
  <header class="app-header">
      <nav class="main-navbar">
          <div class="upper-links">
              <router-link to="/" class="navbar-icon-link"><img class="monday-logo" src="@/assets/icons/monday-logo.png" alt=""><div></div></router-link>
              <router-link to="/workspace" class="navbar-icon-link selected"><img src="@/assets/icons/squares-icon.png" alt=""><div></div></router-link>
              <router-link to="/about" class="navbar-icon-link"><img src="@/assets/icons/ring-icon.png" alt=""><div></div></router-link>
          </div>
          <div class="lower-links">
              <router-link to="/" class="navbar-icon-link"><img src="@/assets/icons/inbox-icon.png" alt=""><div></div></router-link>
              <router-link to="/" class="navbar-icon-link"><img src="@/assets/icons/calender-icon.png" alt=""><div></div></router-link>
          </div>
      </nav>
  </header>
</template>

<script>
export default {

}
</script>