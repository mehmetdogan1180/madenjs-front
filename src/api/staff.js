export const getAll = () => ({
  url: '/staff',
  method: 'get',
});

export const get = (params) => ({
  url: `/staff/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/staff/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/staff',
  method: 'post',
});

export const update = (params) => ({
  url: `/staff/${params.id}`,
  method: 'put',
});

export const scorings = () => ({
  url: '/scoring',
  method: 'get',
});

export const scoring = (params) => ({
  url: `/scoring/${params.id}`,
  method: 'get',
});
