module.exports = {
    content: [
        {
            validator: 'isEmpty',
            reverse: true,
            message: '请输入评论内容'
        },
        {
            validator: 'isLength',
            extraArgs: {
                min: 10
            },
            message: '让每一条评论都有意义，请至少输入 10 个字符'
        }
    ]
}
