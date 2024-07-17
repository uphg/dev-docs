import{_ as s}from"./chunks/plugin-vue_export-helper.x3n3nnut.js";import{x as i,v as a,z as n}from"./chunks/vue.6z6dcVl3.js";const y=JSON.parse('{"title":"ruby 笔记","description":"","frontmatter":{},"headers":[],"relativePath":"full-stack/bookkeeping/ruby.md","filePath":"full-stack/bookkeeping/ruby.md","lastUpdated":1693910240000}'),p={name:"full-stack/bookkeeping/ruby.md"},t=n(`<h1 id="ruby-笔记" tabindex="-1">ruby 笔记 <a class="header-anchor" href="#ruby-笔记" aria-label="Permalink to &quot;ruby 笔记&quot;">​</a></h1><p>获取参数中不为空的字段</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.find params[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tag.update params.permit(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>重新获取数据库数据两种方法（用于获取最新的当前数据，在修改数据后使用）</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.find tag.id</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tag.reload</span></span></code></pre></div><p>ISO8601 表示时间标准格式</p><p>时间排序修改时区</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.happen_at.in_time_zone(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Beijing&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).strftime(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;%F&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><blockquote><p>搜索 ruby spaceship operator 查看常用时间格式化参数</p></blockquote><p><code>||</code> 简写</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hash[key] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hash[key] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以缩写为</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hash[key] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span></code></pre></div><p>sort 排序改变原数据</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">groups </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> groups.sort { |a, b| a[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:happen_at</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:happen_at</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以写为，&quot;!&quot; 表示根据排序改变原数组</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">groups.sort! { |a, b| a[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:happen_at</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:happen_at</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] }</span></span></code></pre></div><p>class 声明属性</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Session</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  include</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ActiveModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Model</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  attr_accessor</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :email</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  attr_accessor</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :code</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以简写为</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Session</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  include</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ActiveModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Model</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  attr_accessor</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :email</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:code</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div>`,15),h=[t];function l(e,k,r,d,g,c){return a(),i("div",null,h)}const u=s(p,[["render",l]]);export{y as __pageData,u as default};
