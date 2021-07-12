export const form = () => {
  const schema = [
    {
      name: 'name',
      label: 'Grup Adı',
      rules: 'required',
    },
  ];
  return schema;
};

export const list = () => {
  const schema = [
    {
      label: 'Grup Adı',
      name: 'name',
      sortable: true,
    },
  ];
  return schema;
};

export const primaryKey = 'id';
