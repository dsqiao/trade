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
@media (max-width: 640px) {
  html.standalone-site #app {
    box-sizing: border-box;
    min-height: 100vh;
    padding:
      max(12px, env(safe-area-inset-top))
      max(12px, env(safe-area-inset-right))
      max(12px, env(safe-area-inset-bottom))
      max(12px, env(safe-area-inset-left));
  }
  .standalone-header {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding: 12px;
  }
  .standalone-brand {
    font-size: 0.95rem;
  }
  .standalone-nav {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }
  .standalone-nav a {
    padding: 8px 4px;
    text-align: center;
    white-space: nowrap;
    font-size: 0.82rem;
  }
  .standalone-content .sub-page {
    max-width: none;
  }
  .standalone-content .sub-page .page-title {
    margin-bottom: 16px;
    font-size: clamp(1.3rem, 6vw, 1.65rem);
    overflow-wrap: anywhere;
  }
  .standalone-content .sub-page .hero-card {
    margin-bottom: 18px;
    padding: 18px;
  }
  .standalone-content .sub-page .hero-value {
    font-size: clamp(1.8rem, 8vw, 2.4rem);
    overflow-wrap: anywhere;
  }
  .standalone-content .sub-page .section {
    margin-bottom: 24px;
  }
  .standalone-content .sub-page .section-title {
    margin-bottom: 12px;
    font-size: 1rem;
  }
  .standalone-content .sub-page .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }
  .standalone-content .sub-page .stat-card {
    min-width: 0;
    padding: 12px;
  }
  .standalone-content .sub-page .stat-label {
    font-size: 0.7rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
  .standalone-content .sub-page .stat-value {
    font-size: clamp(0.9rem, 4vw, 1.08rem);
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  .standalone-content .sub-page .stat-hint,
  .standalone-content .sub-page .note {
    font-size: 0.68rem;
    line-height: 1.5;
  }
  .standalone-content .sub-page .month-block {
    overflow: visible;
  }
}

@media (max-width: 360px) {
  .standalone-content .sub-page .stat-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
