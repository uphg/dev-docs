import{_ as s,c as n,o as e,Q as a}from"./chunks/framework.a058074e.js";const T=JSON.parse('{"title":"HTTP","description":"","frontmatter":{},"headers":[],"relativePath":"full-stack/http.md","filePath":"full-stack/http.md","lastUpdated":1692101676000}'),p={name:"full-stack/http.md"},l=a(`<h1 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-label="Permalink to &quot;HTTP&quot;">​</a></h1><p>HTTP 协议 URL 不支持 # 锚点参数，默认 # 后的内容都会去除</p><p>http 请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">GET HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">Accept: text/html</span></span>
<span class="line"><span style="color:#e1e4e8;">Host: baidu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">\\r\\n（回车+换行）</span></span>
<span class="line"><span style="color:#e1e4e8;">{ &quot;name&quot;: &quot;Jack&quot; }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">GET HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">Accept: text/html</span></span>
<span class="line"><span style="color:#24292e;">Host: baidu.com</span></span>
<span class="line"><span style="color:#24292e;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">\\r\\n（回车+换行）</span></span>
<span class="line"><span style="color:#24292e;">{ &quot;name&quot;: &quot;Jack&quot; }</span></span></code></pre></div><p>http 响应</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: </span></span>
<span class="line"><span style="color:#e1e4e8;">Set-Cookie: session_id=xxx;expires...</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection: kee-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Encoding: gzip</span></span>
<span class="line"><span style="color:#e1e4e8;">\\r\\n（回车+换行）</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: </span></span>
<span class="line"><span style="color:#24292e;">Set-Cookie: session_id=xxx;expires...</span></span>
<span class="line"><span style="color:#24292e;">Connection: kee-alive</span></span>
<span class="line"><span style="color:#24292e;">Content-Encoding: gzip</span></span>
<span class="line"><span style="color:#24292e;">\\r\\n（回车+换行）</span></span>
<span class="line"><span style="color:#24292e;">...</span></span></code></pre></div><p>Content-Type 写法格式查阅 MIME Type</p>`,7),t=[l];function o(c,i,r,d,y,h){return e(),n("div",null,t)}const _=s(p,[["render",o]]);export{T as __pageData,_ as default};
