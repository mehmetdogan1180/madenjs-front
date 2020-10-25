export const getAll = () => ({
  url: '/user',
  method: 'get',
});

export const get = (params) => ({
  url: `/user/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/user/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/user',
  method: 'post',
});

export const update = (params) => ({
  url: `/user/${params.id}`,
  method: 'put',
});
