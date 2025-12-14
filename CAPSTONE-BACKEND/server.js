'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0', // 🔥 WAJIB DI RAILWAY
    routes: {
      cors: {
        origin: [
          'https://capsproject-7cseyhavr-muhammad-setya-adjies-projects.vercel.app'
        ],
        credentials: true,
        additionalHeaders: ['cache-control', 'x-requested-with', 'authorization'],
      },
    },
  });

  await server.register([
    require('./src/api/users'),
    require('./src/api/leads'),
  ], {
    routes: {
      prefix: '/api',
    },
  });

  await server.start();
  console.log('Server Hapi berjalan di %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
