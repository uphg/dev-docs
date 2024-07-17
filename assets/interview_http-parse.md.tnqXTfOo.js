import{_ as a}from"./chunks/plugin-vue_export-helper.x3n3nnut.js";import{x as e,v as T,z as t}from"./chunks/vue.6z6dcVl3.js";const C=JSON.parse('{"title":"HTTP 相关问题","description":"","frontmatter":{},"headers":[],"relativePath":"interview/http-parse.md","filePath":"interview/http-parse.md","lastUpdated":1695738516000}'),p={name:"interview/http-parse.md"},P=t('<h1 id="http-相关问题" tabindex="-1">HTTP 相关问题 <a class="header-anchor" href="#http-相关问题" aria-label="Permalink to &quot;HTTP 相关问题&quot;">​</a></h1><h2 id="为什么说-http-2-可以压缩-head-但是-http-1-1-不行" tabindex="-1">为什么说 HTTP/2 可以压缩 head，但是 HTTP/1.1 不行 <a class="header-anchor" href="#为什么说-http-2-可以压缩-head-但是-http-1-1-不行" aria-label="Permalink to &quot;为什么说 HTTP/2 可以压缩 head，但是 HTTP/1.1 不行&quot;">​</a></h2><p>HTTP/1.1和HTTP/2都可以在请求和响应中使用头部（headers）来传递元数据和其他信息。然而，HTTP/2引入了一种称为&quot;首部压缩&quot;（Header Compression）的机制，使得头部能够在传输过程中进行压缩，从而减少数据的大小。</p><p>在HTTP/1.1中，每个请求和响应的头部都是以纯文本的形式发送的，这意味着每个字段的名称和值都以可读的形式发送。由于HTTP/1.1不进行头部压缩，每个请求和响应都会重复发送相同的头部字段，这会增加数据传输的开销。尤其是当使用长时间持久连接（keep-alive）时，这种重复的头部会占用更多的带宽和传输时间。</p><p>HTTP/2采用了一种称为HPACK的压缩算法来压缩头部。HPACK使用了两个主要的技术：首先，它使用了静态字典和动态字典来存储常见的头部字段，这样就不需要每次都发送完整的字段名称和值；其次，它使用了对称差分编码（Huffman Encoding）来进一步压缩头部字段的值。这种压缩方式减小了头部的大小，从而减少了数据传输的开销。</p><p>通过首部压缩，HTTP/2可以显著减少数据传输的大小，提高性能并减少延迟。这是HTTP/1.1所不具备的特性之一。</p><h2 id="如何理解-http-2-使用了二进制传输-而且将-head-和-body-分成帧来传输" tabindex="-1">如何理解 HTTP/2 使用了二进制传输，而且将 head 和 body 分成帧来传输？ <a class="header-anchor" href="#如何理解-http-2-使用了二进制传输-而且将-head-和-body-分成帧来传输" aria-label="Permalink to &quot;如何理解 HTTP/2 使用了二进制传输，而且将 head 和 body 分成帧来传输？&quot;">​</a></h2><p>HTTP/2引入了一种新的传输机制，称为&quot;二进制传输&quot;（Binary Protocol）。与HTTP/1.1使用纯文本格式不同，HTTP/2使用了二进制格式来传输数据。</p><p>在HTTP/2中，请求和响应被分割成更小的数据单元，称为&quot;帧&quot;（Frames）。一个HTTP/2连接由多个帧组成，每个帧都包含了一部分数据以及相关的控制信息。这种分割和封装的方式使得多个帧可以同时在一个连接上进行传输，提高了传输的效率和并发性。</p><p>HTTP/2的帧可以被分为不同类型，其中两个重要的类型是头部帧（Header Frames）和数据帧（Data Frames）。</p><p>头部帧（Header Frames）包含了请求或响应的元数据，例如头部字段。这些帧中的数据使用二进制格式进行编码和传输，并且可以被首部压缩机制所压缩。</p><p>数据帧（Data Frames）包含了请求或响应的实际数据内容，例如网页的HTML或图片的二进制数据。这些帧中的数据同样使用二进制格式进行编码和传输。</p><p>通过将请求和响应分成帧，并使用二进制格式进行传输，HTTP/2能够更高效地处理数据。它可以同时发送多个帧，避免了HTTP/1.1中的&quot;队头阻塞&quot;（Head-of-Line Blocking）问题，提高了并发性和吞吐量。同时，二进制传输还提供了更好的错误检测和处理机制，使得通信更可靠。</p><p>总而言之，HTTP/2采用了二进制传输和帧的概念，对请求和响应进行了分割和封装，以提高传输效率和并发性，并引入了更可靠的错误处理机制。</p><h2 id="一个帧是什么" tabindex="-1">一个帧是什么？ <a class="header-anchor" href="#一个帧是什么" aria-label="Permalink to &quot;一个帧是什么？&quot;">​</a></h2><p>一个帧（Frame）是HTTP/2中的最小传输单位，它是由一组二进制数据组成的数据块。每个帧都包含了特定类型的数据和相关的控制信息，用于在HTTP/2连接上进行传输。</p><p>HTTP/2中定义了多种类型的帧，每种类型的帧都有不同的目的和结构。以下是一些常见的帧类型：</p><ol><li>数据帧（Data Frame）：用于传输请求或响应的实际数据内容，例如网页的HTML或图片的二进制数据。</li><li>头部帧（Header Frame）：包含了请求或响应的元数据，例如头部字段。这些帧中的数据使用二进制格式进行编码和传输，并且可以被首部压缩机制所压缩。</li><li>优先级帧（Priority Frame）：用于指定请求的优先级，以帮助服务器和客户端进行资源调度和处理。</li><li>设置帧（Settings Frame）：用于在连接的两端传递配置参数和设置信息，例如流控制的窗口大小、首部压缩的表大小等。</li><li>窗口更新帧（Window Update Frame）：用于动态调整流控制窗口的大小，以控制数据流的传输速率。</li></ol><p>除了上述帧类型，HTTP/2还定义了其他一些用于控制和管理连接的帧，例如PING帧、GOAWAY帧等。</p><p>每个帧都包含了一个帧头（Frame Header），其中包含了一些必要的控制信息，如帧的长度、类型、标志位等。帧头的存在使得HTTP/2能够对帧进行识别、解析和处理。</p><p>通过使用帧，HTTP/2实现了多路复用和并行传输，提高了性能和效率，并提供了更好的错误处理和控制能力。</p><h2 id="描述一下-http-四次挥手" tabindex="-1">描述一下 HTTP 四次挥手？ <a class="header-anchor" href="#描述一下-http-四次挥手" aria-label="Permalink to &quot;描述一下 HTTP 四次挥手？&quot;">​</a></h2><p>HTTP是基于TCP协议的应用层协议，而TCP的连接的关闭过程被称为&quot;四次挥手&quot;（Four-Way Handshake）。下面是描述HTTP四次挥手的过程：</p><ol><li>客户端向服务器发送关闭连接请求： 客户端发送一个TCP报文段，其中设置了FIN（Finish）标志位，表示客户端已经完成数据的发送，并请求关闭连接。此时，客户端进入&quot;半关闭&quot;状态，即只能发送数据，不能再接收数据。</li><li>服务器回复确认关闭请求： 服务器收到关闭请求后，发送一个带有ACK（Acknowledgment）和FIN标志位的TCP报文段，表示服务器已经接受了关闭请求，并且也准备关闭连接。此时，服务器进入相同的&quot;半关闭&quot;状态。</li><li>服务器向客户端发送剩余的数据： 如果服务器还有未发送完的数据，它会继续发送数据给客户端。这些数据会被客户端接收和处理。</li><li>服务器发送关闭连接请求： 当服务器完成数据的发送后，它会发送一个带有FIN标志位的TCP报文段，表示服务器已经完成数据的发送，并请求关闭连接。</li><li>客户端回复确认关闭请求： 客户端收到服务器的关闭请求后，发送一个带有ACK标志位的TCP报文段，表示客户端已经接受了关闭请求，并且连接即将关闭。</li></ol><p>此时，连接正式关闭，双方都进入了&quot;关闭&quot;状态。双方都可以安全地关闭连接，并释放相关的资源。</p><p>需要注意的是，四次挥手过程中可能存在延迟和丢失的情况，因此双方需要进行超时重传等机制来保证连接的可靠关闭。另外，HTTP/2引入了多路复用机制，可能会有多个HTTP请求共享同一个TCP连接，因此关闭连接时需要考虑所有请求的状态和处理。</p><h2 id="什么是报文段-什么是标志位" tabindex="-1">什么是报文段，什么是标志位？ <a class="header-anchor" href="#什么是报文段-什么是标志位" aria-label="Permalink to &quot;什么是报文段，什么是标志位？&quot;">​</a></h2><p>在TCP协议中，数据的传输被切分成称为&quot;报文段&quot;（Segment）的小块。报文段是TCP传输的基本单位，它承载了数据的一部分，并包含了TCP头部和数据部分。</p><p>TCP 报文段的结构如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>TCP头部（TCP Header）+ 数据部分（Data）</span></span></code></pre></div><p>TCP 头部包含了一些控制信息和元数据，用于控制TCP连接的建立、维护和关闭。头部字段包括源端口和目标端口（用于标识通信的进程）、序列号和确认号（用于实现可靠传输和流量控制）、窗口大小（用于流量控制和拥塞控制）、校验和（用于错误检测）等。TCP 头部的长度为 20 个字节，但可以根据选项字段的存在而变化。</p><p>数据部分则是 TCP 传输的实际数据内容，例如 HTTP 请求或响应的内容。</p><p>标志位（Flags）是 TCP 头部中的一组控制标志，用于指示 TCP 报文段的状态和执行特定的操作。常见的 TCP 标志位包括：</p><ul><li>SYN（Synchronize）：用于建立连接时进行同步序列号的交换。</li><li>ACK（Acknowledgment）：用于确认已收到的数据。</li><li>PSH（Push）：表示接收方应该尽快将数据交给应用层，而不是等待缓冲区填满。</li><li>FIN（Finish）：表示发送方已经完成数据的发送，并请求关闭连接。</li><li>RST（Reset）：用于重置连接，通常表示连接出现错误或异常。</li></ul><p>这些标志位的组合可以表示不同的状态和操作，如建立连接、关闭连接、确认数据、重置连接等。</p><p>通过 TCP 报文段的传输和 TCP 头部中的标志位，TCP 协议能够实现可靠的数据传输和连接的管理。</p><h2 id="get-产生一个-tcp-数据包-post-产生两个或以上-tcp-数据包" tabindex="-1">GET 产生一个 TCP 数据包，POST 产生两个或以上 TCP 数据包？ <a class="header-anchor" href="#get-产生一个-tcp-数据包-post-产生两个或以上-tcp-数据包" aria-label="Permalink to &quot;GET 产生一个 TCP 数据包，POST 产生两个或以上 TCP 数据包？&quot;">​</a></h2><p>在一般情况下，HTTP 请求（无论是 GET 还是 POST）都会通过 TCP 连接进行传输，而 TCP 连接使用多个 TCP 数据包来承载 HTTP 请求和响应。</p><p>无论是 GET 请求还是 POST 请求，都需要经过 TCP 的三次握手建立连接，然后通过 TCP 数据包进行数据的传输。在 HTTP 请求的过程中，涉及到请求头、请求体、响应头和响应体等数据内容。</p><p>对于GET请求，通常情况下可以在一个TCP数据包中完成。GET 请求的参数通常是通过URL的查询字符串（Query String）来传递，因此请求头部分比较小，不需要额外的请求体数据。</p><p>而对于POST请求，由于POST请求通常需要传递较大的请求体数据，将数据放在请求体中传递，因此可能需要分成多个TCP数据包进行传输。第一个TCP数据包中包含请求头和一部分请求体数据，后续的TCP数据包则继续传输请求体数据直到完成。</p><p>需要注意的是，TCP 数据包的具体数量和大小可以受到多个因素的影响，如网络延迟、数据大小、TCP 窗口大小等。因此，并不能绝对地说 GET 请求只产生一个 TCP 数据包，而POST请求产生两个或以上的 TCP 数据包。实际情况可能会有所不同。</p>',42),i=[P];function o(r,l,h,s,n,d){return T(),e("div",null,i)}const u=a(p,[["render",o]]);export{C as __pageData,u as default};
