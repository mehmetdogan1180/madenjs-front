export const form = (type) => {
  const schema = [
    [
      {
        name: 'name',
        label: 'İsim',
        rules: 'required',
      },
      {
        name: 'surname',
        label: 'Soyisim',
        rules: 'required',
      },
    ],
    [
      {
        name: 'username',
        label: 'Kullanıcı Kodu',
        rules: 'required',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Parola',
        rules: 'required',
        attrs: {
          autocomplete: 'new-password',
        },
      },
    ],
  ];
  const formSchema = [
    [
      {
        name: 'name',
        label: 'İsim',
        rules: 'required',
      },
      {
        name: 'surname',
        label: 'Soyisim',
        rules: 'required',
      },
    ],
    [
      {
        name: 'username',
        label: 'Kullanıcı Kodu',
        rules: 'required',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Parola',
        rules: 'min:3',
        attrs: {
          autocomplete: 'new-password',
        },
      },
    ],
  ];
  if (type === 'edit') {
    return formSchema;
  }
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
      label: 'Soyisim',
      name: 'surname',
      sortable: true,
    },
    {
      label: 'Kullanıcı Adı',
      name: 'username',
      sortable: true,
    },
  ];
  return schema;
};

export const primaryKey = 'id';
