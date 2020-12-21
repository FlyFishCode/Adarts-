/*
 * @Author: your name
 * @Date: 2020-07-15 16:45:40
 * @LastEditTime: 2020-08-11 15:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_adarts_league\vue.config.js
 */
/* eslint-disable quotes */
/* eslint-disable indent */
// vue.config.js
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];
// 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: "/leaguerear/",
    outputDir: "leaguerear",
    devServer: {
        port: 8010,
        proxy: {
            "/aps": {
                // target: "http://192.168.2.105:9091/darts", // 后端
                // target: "http://localhost:8080", // node
                // target: "http://192.168.2.122:9091/darts",
                // target: "http://2x99403n23.qicp.vip/darts", // 实时访问后端
                target: "http://47.113.88.23:9091/darts", // 远程
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "/aps": ""
                }
            }
        }
    },
    // chainWebpack: config => {
    //         config.resolve.alias.set("@", resolve("./src")).set("components", resolve("./src/components"));
    //         // set第一个参数：设置的别名，第二个参数：设置的路径
    //     }
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
                assets: "@/assets",
                components: "@/components",
                views: "@/views"
            }
        },
        plugins: [
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: "gzip",
                test: new RegExp(`\\.(${productionGzipExtensions.join("|")})$`),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
};