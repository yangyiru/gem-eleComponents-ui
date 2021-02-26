
// 1.修改入口文件默认src为examples
// 2.其次将packages加入打包编译任务中
const path = require('path');
const markdownRender = require('markdown-it')();

function resolve (dir) {
    return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
// const vueMarkdown = {
//     preprocess: (MarkdownIt, source) => {
//         MarkdownIt.renderer.rules.table_open = function () {
//             return '<table class="table">'
//         }
//         MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
//         return source
//     },
//     use: [
//         [MarkdownItContainer, 'demo', {
//             // 用于校验包含demo的代码块
//             validate: params => params.trim().match(/^demo\s*(.*)$/),
//             render: function (tokens, idx) {

//                 var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

//                 if (tokens[idx].nesting === 1) {
//                     var desc = tokens[idx + 2].content;
//                     // 编译成html
//                     const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
//                     // 移除描述，防止被添加到代码块
//                     tokens[idx + 2].children = [];

//                     return `<demo-show>
//                         <div slot="desc">${html}</div>
//                         <div slot="highlight">`;
//                 }
//                 return '</div></demo-show>\n';
//             }
//         }]
//     ]
// }
module.exports = {
    publicPath: './',
    pages: {
        index: {
            entry: 'examples/main.js',// 1.修改入口文件默认src为examples
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 2.扩展webpack
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./examples'))
            .set('components', resolve('./examples/components'))
        config.module
            .rule('js')
            .include
            .add('/packages/').end()
            // .add(/examples/).end()
            .use('babel')
            .loader('babel - loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.module.rule('md')  // 处理md文档预览
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
                use: [
                    [require('markdown-it-container'), 'demo', {
                        validate: function (params) {
                            return params.trim().match(/^demo\s*(.*)$/)
                        },

                        render: function (tokens, idx) {
                            console.log(tokens, idx)
                            if (tokens[idx].nesting === 1) {
                                // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                                let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                                let description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : ''
                                let descriptionHTML = description ? markdownRender.render(description) : ''
                                // 2.获取代码块内的html和js代码
                                let content = tokens[idx + 1].content
                                // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                                return `<demo-show>
                                    <div class="source" slot="source">${content}</div>
                                    ${descriptionHTML}
                                    <div class="highlight" slot="highlight">`
                            } else {
                                return '</div></demo-show>\n'
                            }
                        }
                    }]
                ]
            })
    },
    // 输出文件目录
    outputDir: 'gem-ele-ui',
    // 设置生成的静态资源文件(mixin、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',
    // 设置是否在构建生产包时省的sourcemap文件，false可提高构建速度
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: true,
    devServer: {
        open: true,
    }
}
