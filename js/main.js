const css1 = `/* 
 * 面试官你好，我是欧阳帆
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`;

const md = `
# 自我介绍
我叫 欧阳帆
1991 年 12 月出生
东南大学毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
熟悉 React Vue
了解 Node.js Flutter
有一定Java后端经验
# 项目介绍
1. 苹果风格轮播
2. mac键盘导航网站
3. canvas画板
# 联系方式
- QQ 405149126
- Email c2kaka@126.com
- 手机 xxxxxxx
`;

const css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`;

const css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`;

writeCSS("", css1, () => {
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCSS(css1, css2, () => {
        convertMarkdownToHtml(() => {
          writeCSS(css1 + css2, css3, () => {
            console.log("完成！");
          });
        });
      });
    });
  });
});

/**
 * helper functions
 */
function writeCSS(prefix = "", code, fn) {
  let n = 0;

  let id = window.setInterval(() => {
    n += 1;
    let domCode = document.getElementById("code");
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    );
    document.getElementById("styleTag").innerHTML =
      prefix + code.substring(0, n);

    domCode.scrollTop = domCode.scrollHeight;

    if (n >= code.length) {
      window.clearInterval(id);
      console.log(fn instanceof Function);
      if (fn instanceof Function) {
        fn.call();
      }
    }
  }, 10);
}

function createPaper(fn) {
  let paper = document.createElement("div");
  paper.id = "paper";
  let content = document.createElement("pre");
  content.className = "content";
  paper.appendChild(content);
  document.body.appendChild(paper);
  fn && fn.call();
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement("div");
  div.className = "html markdown-body";
  div.innerHTML = marked(md);
  let markdownContainer = document.querySelector("#paper > .content");
  markdownContainer.replaceWith(div);
  fn && fn.call();
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector("#paper>.content");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    domPaper.innerHTML = markdown.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight;
    if (n >= markdown.length) {
      window.clearInterval(id);
      fn && fn.call();
    }
  }, 35);
}
