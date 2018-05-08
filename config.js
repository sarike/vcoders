module.exports = {
    topicPageSize: 30,
    commentPageSize: 100,

    githubAuth: {
        clientID: '0c5f335f05603cf31282',
        clientSecret: 'bdefc6c51b0be6cecf813a24e49fb09c986e2e90',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },

    database: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'vcoders'
    },

    cookie: {
        key: 'vcoders',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
    },

    secretKeys: ['YOUR SECRET KEY']
}
