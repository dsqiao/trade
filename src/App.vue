<script setup>
</script>

<template>
<div class="window">
  <div class="tab">
    <div class="link"><router-link to="/trade/sui">trade sui</router-link></div>
    <div class="link"><router-link to="/history/mara">MARA</router-link></div>
    <div class="link"><router-link to="/history/riot">RIOT</router-link></div>
    <div class="link"><router-link to="/history/tsla">TSLA</router-link></div>
    <div class="link"><router-link to="/history/sq">SQ</router-link></div>
    <div class="link"><router-link to="/history/clsk">CLSK</router-link></div>
    <div class="link"><router-link to="/cashflow">cashflow</router-link></div>
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

.link a {
  font-size: 4rem;
  color: rgb(166, 166, 166);
}

.window {
  min-height: 100vh;
}
</style>
