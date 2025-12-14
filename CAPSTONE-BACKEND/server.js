'use strict';

const Hapi = require('@hapi/hapi');

// CAPSTONE-BACKEND/server.js

const init = async () => {
  const server = Hapi.server({
    // GANTI JADI INI (PENTING!):
    port: process.env.PORT || 5000, 
    host: process.env.HOST || '0.0.0.0', // Wajib 0.0.0.0 biar bisa diakses Vercel
    routes: {
      cors: {
        origin: ['*'], // Membolehkan semua tamu (termasuk Vercel)
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // Header standar
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
    },
  });

  // ... (bagian bawahnya biarkan sama)
  await server.register([ ...

  // Pastikan folder src/api/users dan src/api/leads ada dan memiliki index.js
  await server.register([
    require('./src/api/users'),
    require('./src/api/leads')
  ], {
    routes: {
      prefix: '/api' 
    }
  });

  await server.start();
  console.log('Server Hapi berjalan di %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});


init();


