export default () => ({
    app: {
        port: process.env.PORT,
        clientUrl: process.env.CLIENT_URL
    },
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
    jwt: {
        secret: "mIss:*mIN;0S-1uLh<pgb~8>5",
        expiresIn: '30d'
    },
    googleOauth: {
        clientId: "823443073025-vihjufh6ae4u8ui09109uog1rokj0qv6.apps.googleusercontent.com",
        clientSecret: "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"
    }
});