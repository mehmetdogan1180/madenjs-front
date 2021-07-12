export const form = () => {
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
        name: 'title_id',
        label: 'Unvan',
        rules: 'required',
        type: 'select',
        options: {
          api: {
            request: {
              url: '/title',
            },
            relations: {
              label: 'name',
              value: 'id',
            },
          },
        },
      },
      {
        name: 'shift_period_id',
        label: 'Vardiya',
        rules: 'required',
        type: 'select',
        options: {
          api: {
            request: {
              url: '/shift-period',
            },
            relations: {
              label: 'name',
              value: 'id',
            },
          },
        },
      },
      {
        name: 'tracker_id',
        label: 'Tracker',
        type: 'select',
        options: {
          api: {
            request: {
              url: '/tracker',
            },
            relations: {
              label: 'name',
              value: 'id',
            },
          },
        },
      },
    ],
    [
      {
        name: 'tc',
        label: 'TC',
        type: 'mask',
        mask: '###########',
        rules: 'length:11',
      },
      {
        name: 'phone',
        label: 'Telefon',
      },
      {
        name: 'email',
        label: 'E-Posta',
        rules: 'email',
      },
    ],
    [
      {
        name: 'work_start_date',
        label: 'İşe Giriş Tarihi',
        type: 'date',
      },
      {
        name: 'work_relase_date',
        label: 'İşten Ayrılma Tarihi',
        type: 'date',
      },
    ],
    {
      name: 'address',
      label: 'Adres',
      type: 'textarea',
    },
    {
      name: 'is_active',
      label: 'Durum',
      rules: 'required',
      type: 'radio',
      default: 1,
      options: [
        {
          label: 'Aktif',
          value: 1,
        },
        {
          label: 'Pasif',
          value: 0,
        },
      ],
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
      label: 'Soyisim',
      name: 'surname',
      sortable: true,
    },
    {
      label: 'Unvan',
      name: 'title.name',
      sortable: false,
    },
    {
      label: 'Vardiya',
      name: 'shiftPeriod.name',
      sortable: false,
    },
    {
      label: 'Tracker',
      name: 'tracker.name',
      sortable: false,
    },
  ];
  return schema;
};

export const primaryKey = 'id';
