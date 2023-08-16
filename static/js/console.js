// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_4") == undefined) {
  localStorage.setItem("reset_4", "1");
  // 清空之前的标记值
  for (var i = 1; i <= 3; i++) {
    localStorage.removeItem("reset_" + i);
  }
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "提示🍒",
          message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}

// 刷新窗口
function reload() {
    window.location.reload();
}

// 清除localStorage配置项
function clearItem() {
    localStorage.removeItem('blogbg');
    localStorage.removeItem('universe');
    localStorage.removeItem('blur');
    localStorage.removeItem('fpson');
    localStorage.removeItem('transNum');
    localStorage.removeItem('blurRad');
    localStorage.removeItem('font');
    localStorage.removeItem('themeColor');
    localStorage.removeItem('rs');
    localStorage.removeItem('mouse');
    localStorage.removeItem('light');
    localStorage.removeItem('snow');
}

// 初始化localStorage配置项
function initItem() {
    localStorage.setItem("blogbg", "default"),
    localStorage.setItem("universe", "block"),
    localStorage.setItem("blur", "0"),
    localStorage.setItem("fpson", "0"),
    localStorage.setItem("transNum", "98"),
    localStorage.setItem("blurRad", "20"),
    localStorage.setItem("font", "LXGW"), 
    localStorage.setItem("themeColor", "blue"),
    localStorage.setItem("rs", "block"),
    localStorage.setItem("mouse", "on"),
    localStorage.setItem("light", "true"),
    localStorage.setItem("snow", "none")
}


// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
    localStorage.setItem("transNum", 95);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
function setTrans() {
    var elem = document.getElementById("transSet");
    var newTransNum = elem.value;
    var target = document.querySelector('.transValue');
    target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
    localStorage.setItem("transNum", newTransNum);
    curTransMini = newTransNum * 0.95;
    curTransNum = newTransNum;  // 更新当前透明度
    document.querySelector('#rang_trans').style.width = curTransMini + "%";
    document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
};


// 模糊度调节滑块
if (localStorage.getItem("blurRad") == undefined) {
    localStorage.setItem("blurRad", 20);
}
var curBlur = localStorage.getItem("blurRad"); // 当前模糊半径
var miniBlur = curBlur * 0.95;
document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
function setBlurNum() {
    var elem = document.getElementById("blurSet");
    var newBlur = elem.value;
    var target = document.querySelector('.blurValue');
    target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
    localStorage.setItem("blurRad", newBlur);
    curBlur = newBlur;
    miniBlur = curBlur * 0.95;
    // var max = elem.getAttribute("max");
    document.querySelector('#rang_blur').style.width = miniBlur + "%";
    document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
};


// 星空背景特效开关
if (localStorage.getItem("universe") == undefined) {
    localStorage.setItem("universe", "block");
}
document.getElementById("universe").style.display = localStorage.getItem("universe");
function setUniverse() {
  if (document.getElementById("universeSet").checked) {
    document.getElementById("universe").style.display = "block";
    localStorage.setItem("universe", "block");
  } else {
    document.getElementById("universe").style.display = "none";
    localStorage.setItem("universe", "none");
  }
}


// 黑夜霓虹灯开关
if (localStorage.getItem("light") == undefined) {
    localStorage.setItem("light", true);
}
// 这里要适配Pjax
document.addEventListener("pjax:complete", (function() {
    changeLight("true" == localStorage.getItem("light"))
}
)),
document.addEventListener("DOMContentLoaded", (function() {
    changeLight("true" == localStorage.getItem("light"))
}
));
function setLight() {
    document.getElementById("lightSet").checked ? (changeLight(!0),
    localStorage.setItem("light", "true")) : (changeLight(!1),
    localStorage.setItem("light", "false"))
}
function changeLight(e) {
    document.querySelector(".site-name") && (document.querySelector(".site-name").style.animation = e ? "light_15px 10s linear infinite" : "none"),
    document.getElementById("site-title") && (document.getElementById("site-title").style.animation = e ? "light_15px 10s linear infinite" : "none"),
    document.getElementById("site-subtitle") && (document.getElementById("site-subtitle").style.animation = e ? "light_10px 10s linear infinite" : "none"),
    document.getElementById("post-info") && (document.getElementById("post-info").style.animation = e ? "light_5px 10s linear infinite" : "none"),
    document.getElementById("menu_shadow").innerText = e ? ":root{--menu-shadow: 0 0 1px var(--theme-color);}" : ":root{--menu-shadow: none;}"
}


// 模糊效果开关
if (localStorage.getItem("blur") == undefined) {
    localStorage.setItem("blur", 0);
}
if (localStorage.getItem("blur") == 0) {
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
} else {
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
}
function setBlur() {
    if (document.getElementById("blur").checked) {
        localStorage.setItem("blur", 1);
        document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
    } else {
        localStorage.setItem("blur", 0);
        document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
    }
}


// 右侧部件开关
if (localStorage.getItem("rs") == undefined) {
    localStorage.setItem("rs", "block");
}
document.getElementById("rightSide").innerText = `:root{--rightside-display: ${localStorage.getItem("rs")}}`;
function toggleRightside() {
    // 先设置localStorage变量
    if (document.getElementById("rightSideSet").checked) {
        localStorage.setItem("rs", "block");
        document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
    } else {
        localStorage.setItem("rs", "none");
        document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
    }
}


// 雪花开关
if (localStorage.getItem("snow") == undefined) {
    localStorage.setItem("snow", "none");
}
document.getElementById("snow").style.display = localStorage.getItem("snow");
function setSnow() {
    if (document.getElementById("snowSet").checked) {
        document.getElementById("snow").style.display = "block";
        localStorage.setItem("snow", "block");
    } else {
        document.getElementById("snow").style.display = "none";
        localStorage.setItem("snow", "none");
    }
}


// live2D 开关
function setLive2D() {
    if (localStorage.getItem("waifu-display") == undefined) {
        document.querySelector("#waifu-tool .fa-times").click()
    } else {
        document.getElementById("waifu-toggle").click()
    }
}


// 帧率监测开关
if (localStorage.getItem("fpson") == undefined) {
    localStorage.setItem("fpson", "0");
}
function fpssw() {
    if (document.getElementById("fpson").checked) {
        localStorage.setItem("fpson", "1");
    } else {
        localStorage.setItem("fpson", "0");
    }
    setTimeout(reload, 600);
}


// 设置字体
if (localStorage.getItem("font") == undefined) {
    localStorage.setItem("font", "ZhuZiAWan");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
    localStorage.setItem("font", n)
    if (n == "default") {
        document.documentElement.style.setProperty('--global-font', '-apple-system');
        document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
    }
    else {
        document.documentElement.style.setProperty('--global-font', n);
        document.body.style.fontFamily = "var(--global-font), -apple-system, IBM Plex Mono , monosapce, '微软雅黑', sans-serif";
    }
    try { setFontBorder(); } catch (err) { };
}
// 设置字体选择框边界
function setFontBorder() {
    var curFont = localStorage.getItem("font");
    var swfId = "swf_" + curFont;
    document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
    Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
        if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
    });
}


// 设置主题色
if (localStorage.getItem("themeColor") == undefined) {
    localStorage.setItem("themeColor", "green");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
    document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
    localStorage.setItem("themeColor", c);
    // 刷新鼠标颜色
    CURSOR.refresh();
    // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
    var theme_color = map.get(c);
    var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
    var n = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
    var a = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.1)";
    document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
    document.documentElement.style.setProperty("--high-trans-color", n);
    document.documentElement.style.setProperty("--hh-trans-color", a);
}


// 更换背景(自己的代码)
if (localStorage.getItem("blogbg") != undefined) {
    let curBg = localStorage.getItem("blogbg");
    document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${curBg};
    --darkmode-bg: ${curBg};
    --mobileday-bg: ${curBg};
    --mobilenight-bg: ${curBg};
  }`;
    changeBg(curBg);
} else {
    // 替换你自己的默认背景
    document.getElementById("defineBg").innerText = `:root{
    --default-bg: url(https://i.loli.net/2020/09/23/YMovm5S9HEa6rf4.jpg);
    --darkmode-bg:url(https://lskypro.acozycotage.net/Fomalhaut/img/yuanshen1.webp);
    --mobileday-bg: url(https://lskypro.acozycotage.net/Fomalhaut/img/snow.webp);
    --mobilenight-bg: url(https://lskypro.acozycotage.net/Fomalhaut/img/mb8.webp);
  }`;
}
function changeBg(s) {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
        bg.style.backgroundColor = s;
        bg.style.backgroundImage = "none";
        defineColor = s;
    } else {
        bg.style.backgroundImage = s
        defineColor = '#F4D88A';
    };
    localStorage.setItem("blogbg", s);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
}


// 切换自定义颜色
var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  changeBg(document.querySelector("#define_colors").value);
}

// 必应每日壁纸API
let bingDayBg = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
// 必应历史壁纸API
let bingHistoryBg = screen.width <= 768 ? "url(https://bing.img.run/rand_m.php)" : "url(https://bing.img.run/rand.php)";
// EEE.DOG
let EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)";
// 随机美图cdn.seovx.com
let seovx = "url(https://cdn.seovx.com/?mom=302)";
// picsum随机
let picsum = "url(https://picsum.photos/1920/1080.webp)";
// 小歪二次元
// let waiDongman = "url(https://api.ixiaowai.cn/api/api.php)";
//  小歪高清壁纸
let waiBizhi = "url(https://api.ixiaowai.cn/gqapi/gqapi.php)";
// 博天随机
let btstu = "url(http://api.btstu.cn/sjbz/?lx=suiji)";
// tuapi 动漫
// let tuapi = "url(https://tuapi.eees.cc/api.php?category=dongman)";
// unsplash随机 https://source.unsplash.com/random/1920x1080/daily (weekly)
let unsplash = "url(https://source.unsplash.com/random/1920x1080/)";


// 切换链接对应的背景（防抖）
function getPicture() {
    debounce(getPicture_, 300);
}
// 切换链接对应的背景（链接检测）
function getPicture_() {
    let bg = document.getElementById("web_bg");
    checkImgExists(document.getElementById("pic-link").value).then(() => {
        // 有效的图片链接
        var link = "url(" + document.getElementById("pic-link").value + ")";
        bg.style.backgroundImage = link;
        localStorage.setItem("blogbg", link);
        localStorage.setItem("bing", "false");
        if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
        // 提示切换成功
        new Vue({
            data: function () {
                this.$notify({
                    title: "可以啦🍨",
                    message: "切换自定义背景成功！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }).catch(() => {
        // 无效的图片链接，提示无效
        new Vue({
            data: function () {
                this.$notify({
                    title: "链接不对🤣",
                    message: "请输入有效的图片链接！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "warning",
                    duration: 5000
                });
            }
        })
    })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
    return new Promise(function (resolve, reject) {
        var ImgObj = new Image();
        ImgObj.src = imgurl;
        ImgObj.onload = function (res) {
            resolve(res);
        }
        ImgObj.onerror = function (err) {
            reject(err);
        }
    })
}


// 创建窗口
var winbox = "";

function createWinbox() {
    let div = document.createElement("div");
    document.body.appendChild(div);
    winbox = WinBox({
        id: "meihuaBox",
        index: 99,
        title: "美化设置",
        x: "left",
        y: "center",
        minwidth: "300px",
        height: "60%",
        background: 'var(--theme-color)',
        onmaximize: () => {
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
        },
        onrestore: () => {
            div.innerHTML = "";
        },
    });
    winResize();
    window.addEventListener("resize", winResize);

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2>一、显示偏好</h2>

<div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>

<div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
<div class="range">
  <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
  <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
</div>


<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效 (夜间模式) </div><input type="checkbox" id="universeSet" onclick="setUniverse()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 霓虹彩灯 (夜间模式) </div><input type="checkbox" id="lightSet" onclick="setLight()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果 (消耗性能) </div><input type="checkbox" id="blur" onclick="setBlur()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 右侧部件 (默认开启) </div><input type="checkbox" id="rightSideSet" onclick="toggleRightside()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> Live 2D (您来决定) </div><input type="checkbox" id="live2d_on" onclick="setLive2D()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 雪花特效 (日间模式) </div><input type="checkbox" id="snowSet" onclick="setSnow()">
</div>
 
<h2>二、字体设置</h2>
<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
<p id="swfs">
  <a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸ゴシック</a>
  <a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a>
  <a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:black" onclick="setFont('LXGW')">霞鹜文楷</a>
  <a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:black" onclick="setFont('TTQHB')">甜甜圈海报</a>
  <a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:black" onclick="setFont('YSHST')">优设好身体</a>
  <a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:black" onclick="setFont('MiSans')">MiSans</a>
  <a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
</p>

<h2>三、主题色设置</h2>
<div class="content" style="display:flex">
    <input type="radio" id="red" name="colors" value=" " onclick="setColor('red')">
	<input type="radio" id="orange" name="colors" value=" " onclick="setColor('orange')">
	<input type="radio" id="yellow" name="colors" value=" " onclick="setColor('yellow')">
	<input type="radio" id="green" name="colors" value=" " onclick="setColor('green')">
	<input type="radio" id="puregreen" name="colors" value=" " onclick="setColor('puregreen')">
	<input type="radio" id="blue" name="colors" value=" " onclick="setColor('blue')">
	<input type="radio" id="heoblue" name="colors" value=" " onclick="setColor('heoblue')">
	<input type="radio" id="darkblue" name="colors" value=" " onclick="setColor('darkblue')">
	<input type="radio" id="purple" name="colors" value=" " onclick="setColor('purple')">
	<input type="radio" id="purepurple" name="colors" value=" " onclick="setColor('purepurple')">
	<input type="radio" id="pink" name="colors" value=" " onclick="setColor('pink')">
	<input type="radio" id="gray" name="colors" value=" " onclick="setColor('gray')">
	<input type="radio" id="black" name="colors" value=" " onclick="setColor('black')">
</div>

<h2>四、背景设置</h2>
<center><button onclick="resetBg()" style="background:var(--theme-color);display:block;width:35%;padding:15px 0;border-radius:30px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景</button></center>

<h3>1. 二次元</h3>
<details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/home_bg.webp)" class="imgbox" onclick="changeBg('url(https\://sourcebucket.s3.bitiful.net/img/home_bg.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)')"></a></div>
              </div>
            </details>


<h3>2. 风景</h3>

<details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/fj1.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/fj2.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/fj2.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/fj3.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/fj3.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/fj4.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/fj4.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/fj5.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/fj5.webp)')"></a></div>
              </div>
            </details>

<h3>3. 萌宠</h3>

<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mc1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mc1.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mc2.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mc2.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mc3.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mc3.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mc4.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mc4.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mc5.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mc5.webp)')"></a></div>
              </div>
            </details>

<h3>4. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)" onclick="changeBg('linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)" onclick="changeBg('linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)')"></a></div>
              </div>
            </details>


<h3>5. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>    <input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>


<h3>6. 适配手机</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/mb4.webp)" class="pimgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/mb4.webp)')"></a>  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)')"></a>  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)')"></a>  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)')"></a>  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)')"></a>  <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)')"></a></div>
              </div>
            </details>


<h3>7. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a>  <a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a>  <a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a>  <a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a>  <a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a>  <a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a>  <a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a>  <a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>


<h3>8. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://i.loli.net/2020/09/23/YMovm5S9HEa6rf4.jpg"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>

<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>

</div>
</div>
`;

    // 打开小窗时候初始化
    $("#" + localStorage.getItem("themeColor")).attr("checked", true);
    if (localStorage.getItem("blur") == 1) {
        document.getElementById("blur").checked = true;
    } else {
        document.getElementById("blur").checked = false;
    }
    if (localStorage.getItem("universe") == "block") {
        document.getElementById("universeSet").checked = true;
    } else if (localStorage.getItem("universe") == "none") {
        document.getElementById("universeSet").checked = false;
    }
    if (localStorage.getItem("waifu-display") == undefined) {
        document.getElementById("live2d_on").checked = true;
    } else {
        document.getElementById("live2d_on").checked = false;
    }
    if (localStorage.getItem("rs") == "block") {
        document.getElementById("rightSideSet").checked = true;
    } else if (localStorage.getItem("rs") == "none") {
        document.getElementById("rightSideSet").checked = false;
    }
    if (localStorage.getItem("light") == "true") {
        document.getElementById("lightSet").checked = true;
    } else {
        document.getElementById("lightSet").checked = false;
    }
    if (localStorage.getItem("snow") == "block") {
        document.getElementById("snowSet").checked = true;
      } else if (localStorage.getItem("snow") == "none") {
        document.getElementById("snowSet").checked = false;
      }
    setFontBorder();
}

// 恢复默认背景
function resetBg() {
    localStorage.removeItem('blogbg');
    reload();
}

// 恢复默认设置并刷新页面
function reset() {
    clearItem();
    reload();
}

// 适应窗口大小
function winResize() {
    try {
        var offsetWid = document.documentElement.clientWidth;
        if (offsetWid <= 768) {
            winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
        } else {
            winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
        }
    } catch (err) {
        // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector("#meihuaBox")) {
        winbox.toggleClass("hide");
    } else {
        createWinbox();
    };
}
