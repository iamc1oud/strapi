'use strict';

const buildComponentSchema = require('../server/services/helpers/build-component-schema');
const strapi = require('../__mocks__/strapi');

describe('Build Component Schema', () => {
  it('builds the Response schema', () => {
    global.strapi = strapi;

    const apiMocks = [
      {
        name: 'users-permissions',
        getter: 'plugin',
        ctNames: ['role'],
      },
      { name: 'restaurant', getter: 'api', ctNames: ['restaurant'] },
    ];

    let schemas;
    for (const mock of apiMocks) {
      schemas = {
        ...schemas,
        ...buildComponentSchema(mock),
      };
    }

    const schemaLength = Object.keys(schemas).length;
    const [pluginResponseName, apiResponseName] = Object.keys(schemas);
    const [pluginResponseValue, apiResponseValue] = Object.values(schemas);

    const expectedShape = {
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            attributes: { type: 'object', properties: { test: { type: 'string' } } },
          },
        },
        meta: { type: 'object' },
      },
    };

    expect(schemaLength).toBe(2);
    expect(pluginResponseName).toBe('UsersPermissionsRoleResponse');
    expect(apiResponseName).toBe('RestaurantResponse');
    expect(pluginResponseValue).toStrictEqual(expectedShape);
    expect(apiResponseValue).toStrictEqual(expectedShape);
  });

  it('builds the ResponseList schema', () => {
    global.strapi = {
      ...strapi,
      plugins: {
        'users-permissions': {
          ...strapi.plugins['users-permissions'],
          routes: {
            'content-api': { routes: [{ method: 'GET', path: '/test', handler: 'test.find' }] },
          },
        },
      },
      api: {
        restaurant: {
          ...strapi.api.restaurant,
          routes: {
            restaurant: { routes: [{ method: 'GET', path: '/test', handler: 'test.find' }] },
          },
        },
      },
    };

    const apiMocks = [
      {
        name: 'users-permissions',
        getter: 'plugin',
        ctNames: ['role'],
      },
      { name: 'restaurant', getter: 'api', ctNames: ['restaurant'] },
    ];

    let schemas;
    for (const mock of apiMocks) {
      schemas = {
        ...schemas,
        ...buildComponentSchema(mock),
      };
    }

    const schemaLength = Object.keys(schemas).length;
    const schemaNames = Object.keys(schemas);
    const pluginListResponseValue = schemas['UsersPermissionsRoleListResponse'];
    const apiListResponseValue = schemas['RestaurantListResponse'];

    const expectedShape = {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              attributes: { type: 'object', properties: { test: { type: 'string' } } },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            pagination: {
              properties: {
                page: { type: 'integer' },
                pageSize: { type: 'integer', minimum: 25 },
                pageCount: { type: 'integer', maximum: 1 },
                total: { type: 'integer' },
              },
            },
          },
        },
      },
    };

    expect(schemaLength).toBe(4);
    expect(schemaNames.includes('UsersPermissionsRoleListResponse')).toBe(true);
    expect(schemaNames.includes('RestaurantListResponse')).toBe(true);
    expect(pluginListResponseValue).toStrictEqual(expectedShape);
    expect(apiListResponseValue).toStrictEqual(expectedShape);
  });

  it('builds the Request schema', () => {
    global.strapi = {
      ...strapi,
      plugins: {
        'users-permissions': {
          ...strapi.plugins['users-permissions'],
          routes: {
            'content-api': { routes: [{ method: 'POST', path: '/test', handler: 'test.create' }] },
          },
        },
      },
      api: {
        restaurant: {
          ...strapi.api.restaurant,
          routes: {
            restaurant: { routes: [{ method: 'POST', path: '/test', handler: 'test.create' }] },
          },
        },
      },
    };

    const apiMocks = [
      {
        name: 'users-permissions',
        getter: 'plugin',
        ctNames: ['role'],
      },
      { name: 'restaurant', getter: 'api', ctNames: ['restaurant'] },
    ];

    let schemas;
    for (const mock of apiMocks) {
      schemas = {
        ...schemas,
        ...buildComponentSchema(mock),
      };
    }

    const schemaLength = Object.keys(schemas).length;
    const schemaNames = Object.keys(schemas);
    const pluginListResponseValue = schemas['UsersPermissionsRoleRequest'];
    const apiListResponseValue = schemas['RestaurantRequest'];

    const expectedShape = {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { test: { type: 'string' } },
        },
      },
    };

    expect(schemaLength).toBe(4);
    expect(schemaNames.includes('UsersPermissionsRoleRequest')).toBe(true);
    expect(schemaNames.includes('RestaurantRequest')).toBe(true);
    expect(pluginListResponseValue).toStrictEqual(expectedShape);
    expect(apiListResponseValue).toStrictEqual(expectedShape);
  });

  it('builds the LocalizationResponse schema', () => {
    global.strapi = {
      ...strapi,
      plugins: {
        'users-permissions': {
          ...strapi.plugins['users-permissions'],
          routes: {
            'content-api': { routes: [{ method: 'GET', path: '/localizations', handler: 'test' }] },
          },
        },
      },
      api: {
        restaurant: {
          ...strapi.api.restaurant,
          routes: {
            restaurant: { routes: [{ method: 'GET', path: '/localizations', handler: 'test' }] },
          },
        },
      },
    };

    const apiMocks = [
      {
        name: 'users-permissions',
        getter: 'plugin',
        ctNames: ['role'],
      },
      { name: 'restaurant', getter: 'api', ctNames: ['restaurant'] },
    ];

    let schemas;
    for (const mock of apiMocks) {
      schemas = {
        ...schemas,
        ...buildComponentSchema(mock),
      };
    }

    const schemaLength = Object.keys(schemas).length;
    const schemaNames = Object.keys(schemas);
    const pluginListResponseValue = schemas['UsersPermissionsRoleLocalizationResponse'];
    const apiListResponseValue = schemas['RestaurantLocalizationResponse'];

    const expectedShape = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        test: { type: 'string' },
      },
    };

    expect(schemaLength).toBe(4);
    expect(schemaNames.includes('UsersPermissionsRoleLocalizationResponse')).toBe(true);
    expect(schemaNames.includes('RestaurantLocalizationResponse')).toBe(true);
    expect(pluginListResponseValue).toStrictEqual(expectedShape);
    expect(apiListResponseValue).toStrictEqual(expectedShape);
  });

  it('builds the LocalizationRequest schema', () => {
    global.strapi = {
      ...strapi,
      plugins: {
        'users-permissions': {
          ...strapi.plugins['users-permissions'],
          routes: {
            'content-api': {
              routes: [{ method: 'POST', path: '/localizations', handler: 'test' }],
            },
          },
        },
      },
      api: {
        restaurant: {
          ...strapi.api.restaurant,
          routes: {
            restaurant: { routes: [{ method: 'POST', path: '/localizations', handler: 'test' }] },
          },
        },
      },
    };

    const apiMocks = [
      {
        name: 'users-permissions',
        getter: 'plugin',
        ctNames: ['role'],
      },
      { name: 'restaurant', getter: 'api', ctNames: ['restaurant'] },
    ];

    let schemas;
    for (const mock of apiMocks) {
      schemas = {
        ...schemas,
        ...buildComponentSchema(mock),
      };
    }

    const schemaLength = Object.keys(schemas).length;
    const schemaNames = Object.keys(schemas);
    const pluginListResponseValue = schemas['UsersPermissionsRoleLocalizationRequest'];
    const apiListResponseValue = schemas['RestaurantLocalizationRequest'];

    const expectedShape = {
      type: 'object',
      properties: { test: { type: 'string' } },
    };

    expect(schemaLength).toBe(8);
    expect(schemaNames.includes('UsersPermissionsRoleLocalizationRequest')).toBe(true);
    expect(schemaNames.includes('RestaurantLocalizationRequest')).toBe(true);
    expect(pluginListResponseValue).toStrictEqual(expectedShape);
    expect(apiListResponseValue).toStrictEqual(expectedShape);
  });

  it('creates the correct name given multiple content types', () => {
    global.strapi = strapi;
    const apiMock = {
      name: 'users-permissions',
      getter: 'plugin',
      ctNames: ['permission', 'role', 'user'],
    };

    const schemas = buildComponentSchema(apiMock);
    const schemaNames = Object.keys(schemas);
    const [permission, role, user] = schemaNames;

    expect(schemaNames.length).toBe(3);
    expect(permission).toBe('UsersPermissionsPermissionResponse');
    expect(role).toBe('UsersPermissionsRoleResponse');
    expect(user).toBe('UsersPermissionsUserResponse');
  });
});
