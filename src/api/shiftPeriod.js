export const getAll = () => ({
  url: '/shift-period',
  method: 'get',
});

export const get = (params) => ({
  url: `/shift-period/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/shift-period/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/shift-period',
  method: 'post',
});

export const update = (params) => ({
  url: `/shift-period/${params.id}`,
  method: 'put',
});
