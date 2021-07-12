export const getAll = () => ({
  url: '/ibeacon-group',
  method: 'get',
});

export const get = (params) => ({
  url: `/ibeacon-group/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/ibeacon-group/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/ibeacon-group',
  method: 'post',
});

export const update = (params) => ({
  url: `/ibeacon-group/${params.id}`,
  method: 'put',
});
