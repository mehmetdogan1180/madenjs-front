export const getAll = () => ({
  url: '/ibeacon',
  method: 'get',
});

export const get = (params) => ({
  url: `/ibeacon/${params.id}`,
  method: 'get',
});

export const del = (params) => ({
  url: `/ibeacon/${params.id}`,
  method: 'delete',
});

export const create = () => ({
  url: '/ibeacon',
  method: 'post',
});

export const update = (params) => ({
  url: `/ibeacon/${params.id}`,
  method: 'put',
});

export const patch = () => ({
  url: '/ibeacon',
  method: 'patch',
});
