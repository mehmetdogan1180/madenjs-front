export const form = () => {
  const schema = [
    {
      name: 'name',
      label: 'İsim',
      rules: 'required',
    },
  ];
  return schema;
};

export const list = () => {
  const schema = [
    {
      label: 'İsim',
      name: 'name',
      sortable: true,
    },
  ];
  return schema;
};

export const primaryKey = 'id';
