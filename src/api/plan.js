export const postPlan = () => ({
  method: 'post',
  url: '/plan',
});
export const putPlan = ({ planId }) => ({
  method: 'put',
  url: `plan/${planId}`,
});

export const getPlan = ({ planId }) => ({
  method: 'get',
  url: `plan/${planId}`,
});
