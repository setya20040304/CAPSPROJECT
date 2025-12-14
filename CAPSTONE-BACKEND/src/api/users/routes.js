const Joi = require('joi');
const {
  loginHandler,
  getUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} = require('./handler');

const FRONTEND_ORIGIN =
  'https://capsproject-7cseyhavr-muhammad-setya-adjies-projects.vercel.app';

const routes = [
  /* ====================== LOGIN ====================== */
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    options: {
      cors: {
        origin: [FRONTEND_ORIGIN],
        credentials: true,
        additionalHeaders: ['content-type', 'authorization'],
      },
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        }
      },
    },
  },

  /* ====================== GET ALL USERS ====================== */
  {
    method: 'GET',
    path: '/users',
    handler: getUsersHandler,
    options: {
      cors: true,
    }
  },

  /* ====================== GET USER BY ID ====================== */
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUserByIdHandler,
    options: {
      cors: true,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        })
      }
    }
  },

  /* ====================== CREATE USER ====================== */
  {
    method: 'POST',
    path: '/users',
    handler: createUserHandler,
    options: {
      cors: true,
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          role: Joi.string().valid('admin', 'sales').required(),
          password: Joi.string().min(6).required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        }
      },
    },
  },

  /* ====================== UPDATE USER ====================== */
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUserHandler,
    options: {
      cors: true,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: Joi.object({
          name: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          role: Joi.string().valid('admin', 'sales').required(),
          password: Joi.string().min(6).optional().allow('', null),
        }),
        failAction: (request, h, err) => {
          throw err;
        }
      },
    },
  },

  /* ====================== DELETE USER ====================== */
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUserHandler,
    options: {
      cors: true,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        })
      }
    }
  },

  /* ====================== PREFLIGHT (OPTIONS) ====================== */
  {
    method: 'OPTIONS',
    path: '/{any*}',
    handler: (request, h) => h.response().code(200),
    options: {
      cors: {
        origin: [FRONTEND_ORIGIN],
        credentials: true,
        additionalHeaders: ['content-type', 'authorization'],
      }
    }
  },
];

module.exports = routes;
