<template>
  <div class="standalone-app">
    <header class="standalone-header">
      <router-link
        class="standalone-brand"
        to="/sub"
      >子账号 · 投资总览</router-link>
      <nav class="standalone-nav">
        <router-link to="/sub">总览</router-link>
        <router-link to="/sub/funding">出入金</router-link>
        <router-link to="/sub/exchange">货币兑换</router-link>
      </nav>
    </header>
    <main class="standalone-content">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<style>
.standalone-app {
  max-width: 1160px;
  margin: 0 auto;
}
.standalone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  padding: 14px 18px;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
}
.standalone-brand {
  color: var(--text-strong);
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
}
.standalone-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.standalone-nav a {
  padding: 7px 12px;
  border-radius: 7px;
  color: var(--text-muted);
  text-decoration: none;
}
.standalone-nav a:hover,
.standalone-nav a.router-link-active {
  background: var(--accent-soft);
  color: var(--text-strong);
}
.standalone-content {
  min-width: 0;
}
</style>
