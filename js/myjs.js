// 首页头图
var xiaokang = new xkTool(
  "https://i.loli.net/2020/09/23/YMovm5S9HEa6rf4.jpg"
);

// 随机头图
xiaokang.randomBanner(
    "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/", // 前半部分网址
    "-min.jpg", // 后半部分网址
    1, // 随机数开始范围
    57, // 随机数结束范围
    true // 是否开启滤镜 默认不开启
);

// 欺诈标题
xiaokang.cheatTitle();

// 页脚养鱼
xiaokang.footFish();

// 全局左下角APlayer
// xiaokang.aplayer({
//     audio: [
//         {
//             name: "SB",
//             artist: "SB",
//             url: "http://music.163.com/song/media/outer/url?id=574566207.mp3",
//             cover: "SB",
//         },
//     ],
//     fixed: true,
//     mini: true,
// });

// 全局左下角Meting
xiaokang.meting("2391688784", "netease", "playlist");
