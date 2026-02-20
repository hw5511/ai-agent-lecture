module.exports = {
  apps: [
    {
      name: 'ai-agent-lecture',
      script: 'dev.js',
      cwd: 'C:/woohee_dev/22_ai_agent_lecture',
      env: {
        NODE_ENV: 'development'
      },
      watch: false,
      autorestart: true
    }
  ]
};
