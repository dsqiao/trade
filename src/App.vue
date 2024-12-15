<script setup>
</script>

<template>
<div class="window">
  <div class="tab">
    美股:
    <div class="link"><router-link to="/history/mara">MARA</router-link></div>
    <div class="link"><router-link to="/history/riot">RIOT</router-link></div>
    <div class="link"><router-link to="/history/clsk">CLSK</router-link></div>
    <div class="link"><router-link to="/history/sq">SQ</router-link></div>
    <div class="link"><router-link to="/history/tsla">TSLA</router-link></div>
    <div class="link"><router-link to="/history/nio">NIO</router-link></div>
  </div>
  <div class="tab">
    其他:
    <div class="link"><router-link to="/trade/sui">trade sui</router-link></div>
    <div class="link"><router-link to="/cashflow">crypto出入金</router-link></div>
  </div>
  <router-view :key="$route.fullPath" />
</div>
</template>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
}

.link {
  margin: 0 30px;
}

.link a,
.tab {
  font-size: 1.4rem;
  color: rgb(166, 166, 166);
}

.window {
  min-height: 100vh;
}
</style>
