module.exports = {
  title: [
    {
      validator: 'isEmpty',
      reverse: true,
      message: '请输入标题',
    },
    {
      validator: 'isLength',
      extraArgs: {
        min: 5,
        max: 256,
      },
      message: '帖子标题长度需要在 5 - 256 个字符之间',
    },
  ],
  content: [
    {
      validator: 'isEmpty',
      reverse: true,
      message: '请输入帖子内容',
    },
    {
      validator: 'isLength',
      extraArgs: {
        min: 20,
      },
      message: '帖子内容请至少输入 20 个字符',
    },
  ],
  tags: [
    {
      validator: (value, formData) => {
        return (
          (Array.isArray(value) && value.length > 0) ||
          (Array.isArray(formData.newTags) && formData.newTags.length > 0)
        );
      },
      message: '请为主题设置一个标签',
    },
  ],
  newTags: [
    {
      validator: Array.isArray,
      message: '不合法的参数 newTags',
    },
  ],
  userId: [
    {
      validator: () => true,
    },
  ],
  id: [
    {
      validator: () => true,
    },
  ],
};
