
module.exports = {
    theme: '@vuepress/theme-default',
    title: 'Gem-ele-ui 组件库说明文档',  // 设置网站标题
    description: 'Adroi',
    base: '/gem-ele-ui/docs',
    themeConfig: {
        nav: [
            { text: '指南', link: '/guide/' },
            {
                text: '配置',
                link: '/config/'
            },
            // { text: '附录：错误码', link: '/error' }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '布局类组件',
                    collapsable: true,
                    // path: 'bese',
                    children: [
                        {
                            title: 'GemModal弹框', path: 'bese/'
                        }
                    ]
                },
                {
                    title: '可视化组件',
                    collapsable: true,
                    children: [
                        'viewComponent'
                    ]
                }
            ],
            
        },
        sidebarDepth: 2
    }
}