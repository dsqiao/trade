<script setup>
</script>

<template>
  <Suspense>
    <div class="window">
      <div class="tab">
        <span>美股:</span>
        <div class="link"><router-link to="/history/mara">MARA</router-link></div>
        <div class="link"><router-link to="/history/clsk">CLSK</router-link></div>
        <div class="link"><router-link to="/history/nio">NIO</router-link></div>
        <span>（已清仓：</span>
        <div class="link"><router-link to="/history/tsla">TSLA</router-link></div>
        <div class="link"><router-link to="/history/riot">RIOT</router-link></div>
        <div class="link"><router-link to="/history/mstr">MSTR</router-link></div>
        <div class="link"><router-link to="/history/sq">SQ</router-link></div>
        <span>）</span>
      </div>
      <div class="tab">
        crypto:
        <div class="link"><router-link to="/coin-history/sui">SUI-USDC</router-link></div>
        <div class="link"><router-link to="/coin-history/deep">DEEP-USDC</router-link></div>
        <div class="link"><router-link to="/deep-sui">DEEP-SUI</router-link></div>
        <div class="link"><router-link to="/coin-history/ns">NS-USDC</router-link></div>
        <div class="link"><router-link to="/coin-history/wal">WAL-USDC</router-link></div>
        <div class="link"><RouterLink to="/coin-history/jitosol">JitoSOL-USDC</RouterLink></div>
      </div>
      <div class="tab">
        其他：
        <div class="link"><router-link to="/cashflow">crypto出入金</router-link></div>
        <div class="link"><router-link to="/future/btc">long btc</router-link></div>
        <div class="link"><router-link to="/asset">Asset</router-link></div>
      </div>
      <router-view :key="$route.fullPath" />
    </div>
  </Suspense>
</template>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
  height: 3rem;
}

.link {
  margin: 0 30px;
}

.link a,
.tab {
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: rgb(166, 166, 166);
}

.window {
  min-height: 100vh;
}
</style>
