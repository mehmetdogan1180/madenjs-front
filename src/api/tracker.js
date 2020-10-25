export const getAll = () => ({
  url: '/tracker',
  method: 'get',
});

export const get = (params) => ({
  url: `/tracker/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/tracker/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/tracker',
  method: 'post',
});

export const update = (params) => ({
  url: `/tracker/${params.id}`,
  method: 'put',
});

export const patch = () => ({
  url: '/tracker',
  method: 'patch',
});
