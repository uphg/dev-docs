<template>
  <div class="row">
    <div class="header">
      <div class="prefix">性能差</div>
      <div class="suffix">性能高</div>
    </div>
    <div class="content">
      <div class="column">
        <div class="title">innerHTML（模板）</div>
        <div class="column-item">心智负担中等</div>
        <div class="column-item">性能差</div>
      </div>
      <div class="symbol">&lt;</div>
      <div class="column">
        <div class="title">虚拟DOM</div>
        <div class="column-item">心智负担小</div>
        <div class="column-item">可维护性强</div>
        <div class="column-item">性能不错</div>
      </div>
      <div class="symbol">&lt;</div>
      <div class="column">
        <div class="title">原生 JavaScript</div>
        <div class="column-item">心智负担大</div>
        <div class="column-item">可维护性差</div>
        <div class="column-item">性能高</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid var(--vp-c-text-2);
}
.prefix, .suffix, .symbol {
  margin: 8px 0;
}
.content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.title {
  margin: 8px 0;
  font-weight: 700;
}
.column {
  display: inline-block;
  height: 100%;
}
.column-item {
  margin: 8px 0;
}
</style>