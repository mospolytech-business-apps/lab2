<template>
  <header class="d-flex py-3 bg-primary bg-gradient shadow-sm">
    <div class="header__wrapper align-items-center d-flex justify-content-between flex-wrap">
      <a href="/" class="d-flex bg-light py-1 p-2 rounded align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img class="me-2" height="36" src="../assets/images/logo.png"/>
      </a>
      <ul class="nav nav-pills" data-bs-theme="dark">
        <li class="nav-item"><router-link to="/" class="nav-link" :class="{'active': this.$route.path=='/'}">Клиенты и агенты</router-link></li>
        <li class="nav-item"><router-link to="/objects" class="nav-link" :class="{'active': this.$route.path=='/objects'}">Объекты недвижимости</router-link></li>
        <li class="nav-item"><router-link to="/offers" class="nav-link" :class="{'active': this.$route.path=='/offers'}">Предложения и потребности</router-link></li>
        <li class="nav-item"><router-link to="/deals" class="nav-link" :class="{'active': this.$route.path=='/deals'}">Сделки</router-link></li>
        <li class="nav-item"><router-link to="/mobile" class="nav-link" :class="{'active': this.$route.path=='/mobile'}">Мобильное приложение</router-link></li>
      </ul>
    </div>
  </header>
</template>
<script>
</script>
<style >
  :root {
    [data-bs-theme=dark] {
      color-scheme: dark;
    --bs-nav-pills-link-active-color: black;
    --bs-link-color: white;
    --bs-nav-pills-link-active-bg: white;
    }
  }

  .header__wrapper {
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
  }
</style>