/// <reference types="vite/client" />

// todo 使用CSP：CSP即Content Security Policy内容安全策略，限制加载其他域下的资源，这样即使黑客插入了一个 Javascript文件，它也是无法被加载的；
// 开启HTTP only：禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie；
// X-XSS-Protection: 1; mode=block
