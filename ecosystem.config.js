module.exports = {
  apps: [
    {
      name: 'energia',
      script: './dist-server/index.js',
      instances: 1,
    },
  ],
}
