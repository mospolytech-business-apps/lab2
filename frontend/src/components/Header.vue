<template>
  <header class="d-flex justify-content-center py-3 bg-primary bg-gradient shadow-sm">
    <ul class="nav nav-pills" data-bs-theme="dark">
      <li class="nav-item"><router-link to="/" class="nav-link" :class="{'active': this.$route.path=='/'}">Клиенты и агенты</router-link></li>
      <li class="nav-item"><router-link to="/objects" class="nav-link" :class="{'active': this.$route.path=='/objects'}">Объекты недвижимости</router-link></li>
      <li class="nav-item"><router-link to="/offers" class="nav-link" :class="{'active': this.$route.path=='/offers'}">Предложения и потребности</router-link></li>
      <li class="nav-item"><router-link to="/deals" class="nav-link" :class="{'active': this.$route.path=='/deals'}">Сделки</router-link></li>
      <li class="nav-item"><router-link to="/mobile" class="nav-link" :class="{'active': this.$route.path=='/mobile'}">Мобильное приложение</router-link></li>
    </ul>
  </header>
</template>
<style>
:root {
  [data-bs-theme=dark] {
    color-scheme: dark;
  --bs-nav-pills-link-active-color: black;
  --bs-link-color: white;
  --bs-nav-pills-link-active-bg: white;
  }
}
</style>