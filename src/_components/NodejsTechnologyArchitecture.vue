<template>
  <div class="flexible-container">
    <ul class="flexible-table">
      <li>
        <p class="flexible-table__title"><b>Node.js API</b></p>
        <p>http 模块、fs 模块、stream 模块</p>
      </li>
    </ul>
    <ul class="flexible-table">
      <li>
        <p class="flexible-table__title"><b>Node.js bindings</b></p>
        <p>让 JS 和 C/C++ 通信</p>
      </li>
      <li>
        <p class="flexible-table__title"><b>C/C++ 插件</b></p>
        <p>自定义其他能力</p>
      </li>
    </ul>
    <ul class="flexible-table">
      <li>
        <p>JS 引擎</p>
        <p>V8</p>
      </li>
      <li>
        <p>跨平台异步I/O能力</p>
        <p>libuv</p>
      </li>
      <li>
        <p>DNS 解析</p>
        <p>c-ares</p>
      </li>
      <li>
        <p>加密解密</p>
        <p>OpenSSL</p>
      </li>
      <li>
        <p>其他...</p>
        <p>http_parser、zlib</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.flexible-container {
  min-width: 690px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;

  & > .flexible-table {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    text-align: center;

    .flexible-table__title > b {
      font-size: 26px;
      font-weight: 500;
    }

    p {
      margin: 0;
    }

    & > li {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }
    &:nth-child(1) > li {
      width: 100%;
    }
      
    &:nth-child(2) > li {
      width: 50%;
    }
      
    &:nth-child(3) > li {
      flex-grow: 1;
    }
  }
    
}
</style>