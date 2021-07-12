export const form = () => {
  const schema = [
    {
      name: 'name',
      label: 'İsim',
      rules: 'required',
    },
    [
      {
        name: 'mac_address',
        label: 'Mac Adresi',
        rules: 'required|max:18',
      },
      {
        name: 'group_id',
        label: 'Grup',
        rules: 'required',
        type: 'select',
        options: {
          api: {
            request: {
              url: '/ibeacon-group',
            },
            relations: {
              label: 'name',
              value: 'id',
            },
          },
        },
      },
    ],
    {
      name: 'state',
      label: 'Aktif',
      type: 'checkbox',
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
    {
      label: 'Mac Adresi',
      name: 'mac_address',
      sortable: true,
    },
    {
      label: 'Grup',
      name: 'group.name',
    },
    {
      label: 'Durum',
      name: 'state',
      format: (val) => (val === 1 ? 'Aktif' : 'Pasif'),
    },
  ];
  return schema;
};

export const primaryKey = 'id';
