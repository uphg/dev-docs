import{_ as s}from"./chunks/plugin-vue_export-helper.x3n3nnut.js";import{x as i,v as a,z as n}from"./chunks/vue.6z6dcVl3.js";const B=JSON.parse('{"title":"Windows 报错","description":"","frontmatter":{},"headers":[],"relativePath":"errors/windows.md","filePath":"errors/windows.md","lastUpdated":1711193064000}'),l={name:"errors/windows.md"},e=n(`<h1 id="windows-报错" tabindex="-1">Windows 报错 <a class="header-anchor" href="#windows-报错" aria-label="Permalink to &quot;Windows 报错&quot;">​</a></h1><h2 id="kb5034441-更新失败错误代码-0x80070643" tabindex="-1">KB5034441 更新失败错误代码 0x80070643 <a class="header-anchor" href="#kb5034441-更新失败错误代码-0x80070643" aria-label="Permalink to &quot;KB5034441 更新失败错误代码 0x80070643&quot;">​</a></h2><p>调整恢复分区步骤：</p><ol><li>关闭 BitLocker（默认关闭可跳过）。</li><li>打开命令提示符（管理员）。</li><li>依次运行以下命令：<div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 关闭恢复分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reagentc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /disable </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启用磁盘管理工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">diskpart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 显示磁盘列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disk </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 选择c盘所在的磁盘，数字就是 C 盘所在磁盘的数字</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disk [数字]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 显示分区列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> part</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 务必不要选择错误！选择恢复分区，数字就是恢复分区的数字。没有恢复分区的跳过这个步骤</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> part [数字]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除这个分区。如果分区选择错了，将删除错误的分区！没有恢复分区的跳过这个步骤</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">delete</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> partition override </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 选择系统所在分区，数字就是&quot;主要&quot;分区的数字。没有恢复分区的从这一步开始继续操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> part [数字]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 从系统盘分出250MB空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">shrink</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> desired=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">250</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> minimum=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">250</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建恢复分区，并设置格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> partition primary id=de94bba4-06d1-4d40-a16a-bfd50179d6ac  </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gpt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> attributes =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x8000000000000001</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> quick fs=ntfs label=”Windows RE tools” </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 退出磁盘管理工具</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启用恢复分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reagentc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /enable</span></span></code></pre></div></li><li>重启电脑，然后再尝试更新KB5034441。</li><li>若是上述步骤都成功执行，仍然显示 <code>0x80070643</code> 的错误，可以从头再执行一遍，并且把恢复分区改成 1G 的大小，也就是这个命令 <code>shrink desired=250 minimum=250</code> 改成 <code>shrink desired=1024 minimum=1024</code></li></ol><h3 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h3><ul><li><a href="https://answers.microsoft.com/zh-hans/windows/forum/all/kb5034441%e6%9b%b4%e6%96%b0%e5%a4%b1%e8%b4%a5/7ba68fea-7425-4ba0-8fdc-f48bc9191497" target="_blank" rel="noreferrer">KB5034441更新失败错误代码0x80070643【解决方案】</a></li><li><a href="https://www.msn.cn/zh-cn/news/other/%E5%BE%AE%E8%BD%AF%E6%89%BF%E8%AE%A4%E9%94%99%E8%AF%AF-win10-%E5%AE%89%E8%A3%85-3-%E6%9C%88%E6%9B%B4%E6%96%B0%E5%90%8E%E5%86%8D%E6%8E%A8%E9%80%81%E5%8E%BB%E5%B9%B4-10-%E6%9C%88%E6%9B%B4%E6%96%B0/ar-BB1jsz3T" target="_blank" rel="noreferrer">微软承认错误：Win10 安装 3 月更新后再推送去年 10 月更新</a></li></ul>`,6),p=[e];function t(h,k,r,d,c,F){return a(),i("div",null,p)}const E=s(l,[["render",t]]);export{B as __pageData,E as default};
