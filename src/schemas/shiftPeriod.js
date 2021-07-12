export const form = () => {
  const schema = [
    {
      name: 'name',
      label: 'Vardiya Adı',
      rules: 'required',
    },
    [
      {
        name: 'start_hour',
        label: 'Başlangıç Saati',
        rules: 'required',
        type: 'time',
      },
      {
        name: 'end_hour',
        label: 'Bitiş Saati',
        rules: 'required',
        type: 'time',
      },
    ],
  ];
  return schema;
};

export const list = () => {
  const schema = [
    {
      label: 'Vardiya Adı',
      name: 'name',
      sortable: true,
    },
    {
      label: 'Giriş Saati',
      name: 'start_hour',
    },
    {
      label: 'Çıkış Saati',
      name: 'end_hour',
    },
  ];
  return schema;
};

export const primaryKey = 'id';
