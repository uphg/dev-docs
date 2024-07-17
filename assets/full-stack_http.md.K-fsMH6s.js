import{_ as s}from"./chunks/plugin-vue_export-helper.x3n3nnut.js";import{x as a,v as n,z as p}from"./chunks/vue.6z6dcVl3.js";const m=JSON.parse('{"title":"HTTP","description":"","frontmatter":{},"headers":[],"relativePath":"full-stack/http.md","filePath":"full-stack/http.md","lastUpdated":1692101676000}'),t={name:"full-stack/http.md"},e=p(`<h1 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-label="Permalink to &quot;HTTP&quot;">​</a></h1><p>HTTP 协议 URL 不支持 # 锚点参数，默认 # 后的内容都会去除</p><p>http 请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>GET HTTP/1.1</span></span>
<span class="line"><span>Accept: text/html</span></span>
<span class="line"><span>Host: baidu.com</span></span>
<span class="line"><span>Connection: keep-alive</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>\\r\\n（回车+换行）</span></span>
<span class="line"><span>{ &quot;name&quot;: &quot;Jack&quot; }</span></span></code></pre></div><p>http 响应</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>HTTP/1.1 200 OK</span></span>
<span class="line"><span>Content-Type: </span></span>
<span class="line"><span>Set-Cookie: session_id=xxx;expires...</span></span>
<span class="line"><span>Connection: kee-alive</span></span>
<span class="line"><span>Content-Encoding: gzip</span></span>
<span class="line"><span>\\r\\n（回车+换行）</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>Content-Type 写法格式查阅 MIME Type</p>`,7),l=[e];function i(o,c,d,r,h,_){return n(),a("div",null,l)}const k=s(t,[["render",i]]);export{m as __pageData,k as default};
