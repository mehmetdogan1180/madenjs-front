export const getAll = () => ({
  url: '/title',
  method: 'get',
});

export const get = (params) => ({
  url: `/title/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/title/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/title',
  method: 'post',
});

export const update = (params) => ({
  url: `/title/${params.id}`,
  method: 'put',
});
