// import React from 'react';
// import { Story, Meta } from '@storybook/react';
// import { Datagrid, DatagridProps } from '@iocraft/ui';

// export default {
//   component: Datagrid,
//   title: 'Organism/Data grid',
//   argTypes: {},
// } as Meta;

// const Template: Story<DatagridProps> = (args) => <Datagrid {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//   columns: [
//     { field: 'id', headerName: 'ID', width: 100 },
//     { field: 'firstName', headerName: 'First name', width: 200 },
//     { field: 'lastName', headerName: 'Last name', width: 200 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 200,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 200,
//       valueGetter: (params: any) =>
//         `${params.getValue(params.id, 'firstName') || ''} ${
//           params.getValue(params.id, 'lastName') || ''
//         }`,
//     },
//   ],
//   rows: [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     { id: 10, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
//   ],
// };
