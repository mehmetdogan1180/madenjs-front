export const form = () => {
  const schema = [
    {
      name: 'name',
      label: 'İsim',
      rules: 'required',
    },
    {
      name: 'mac_address',
      label: 'Mac Adresi',
      rules: 'required|min:17',
      type: 'mask',
      mask: 'XX:XX:XX:XX:XX:XX',
    },
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
      label: 'Durum',
      name: 'state',
      format: (val) => (val === 1 ? 'Aktif' : 'Pasif'),
    },
  ];
  return schema;
};

export const primaryKey = 'id';
