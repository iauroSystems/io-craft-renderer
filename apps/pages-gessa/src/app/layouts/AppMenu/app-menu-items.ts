export const appMenuItems: any = [
  {
    label: 'Dashboard',
    link: '/',
  },
  {
    label: 'Orders',
    link: '/orders',
  },
  {
    label: 'Customers',
    link: '/customers',
  },
  {
    label: 'Reports',
    link: '/reports',
  },
  {
    label: 'Nested Pages',
    items: [
      {
        label: 'Level 2.0',
      },
      {
        label: 'Level 2.1',
        items: [
          {
            label: 'Level 2.1.0',
          },
          {
            label: 'Level 2.1.1',
            items: [
              {
                label: 'Level 2.1.1.0',
              },
              {
                label: 'Level 2.1.1.1',
              },
              {
                label: 'Level 2.1.1.2',
                items: [
                  {
                    label: 'Level 2.1.1.2.1',
                    items: [
                      {
                        label: 'Level 2.1.1.2.1.1',
                        items: [
                          {
                            label: 'Level 2.1.1.2.1.1.1',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Level 2.2',
      },
    ],
  },
];
