<template>
  <footer class="ftr">
    <div class="wrap row">
      <p>
        <img src="/favicon.svg" alt="" width="22" height="22">
        Andrea Tombolato: sviluppatore, volontario, gamer. HeyAtom sono io.
      </p>
      <ul>
        <li><a href="https://github.com/andreacw5" rel="me noopener" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/atombolato" rel="me noopener" target="_blank">LinkedIn</a></li>
        <li><a href="mailto:hey@heyatom.dev">hey@heyatom.dev</a></li>
      </ul>
      <p class="tag">Code meets personality · {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--hair);
  padding: 2.25rem 0 2.75rem;
  color: var(--ink-3);
  font-size: 0.92rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.row p:first-child { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--ink-2); }
ul { display: flex; gap: 1.4rem; list-style: none; margin: 0; padding: 0; }
a { color: var(--ink-2); text-decoration: none; }
a:hover { color: var(--green-light); }
.tag { font-size: 0.85rem; }
</style>
