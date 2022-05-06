module.exports = {
  apps: [
    {
      name: 'energia',
      script: './dist-server/index.js',
      cwd: './dist-server',
      instances: 1,
    },
  ],
}
