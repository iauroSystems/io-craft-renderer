// import { useTheme } from '@mui/system';
// const theme: any = themes.default;

import themes from '../theme';

export const lineData = {
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: themes.default?.palette?.systemColor4?.sys300Main,
        // backgroundColor: `linear-gradient(180deg, rgba(${themes.default.palette.systemColor3.sys300Main},0.28), 5.1%, rgba(${themes.default.palette.systemColor3.sys300Main}, 0) 113.73%);`,
        backgroundColor: themes.default?.palette?.systemColor4?.sys100,
        pointRadius: 2,
        pointStyle: 'circle',
        borderWidth: 1,
      },
      {
        label: 'Dataset 2',
        data: [70, 51, 85, 71, 46, 59, 48],
        borderColor: themes.default?.palette?.systemColor3?.sys300Main,
        pointRadius: 2,
        backgroundColor: themes.default?.palette?.systemColor3?.sys100,
        pointStyle: 'circle',
        borderWidth: 1,
      },
    ],
  },

  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
    bar_thickness: 25,
    axis_border_Color: themes.default?.palette?.neutral?.neu100,
    display_grid: { x: true, y: false },
    axis_ticks_color: themes.default?.palette?.text?.tex400,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },
};

// export const lineWithTensionData = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: 'red',
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [70, 51, 85, 71, 46, 59, 48],
//         borderColor: 'green',
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//     ],
//   },
// };

export const linechartFilled = {
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: themes.default?.palette?.systemColor4?.sys300Main,
        fill: true,
        // backgroundColor: `linear-gradient(180deg, rgba(${themes.default.palette.systemColor3.sys300Main},0.28), 5.1%, rgba(${themes.default.palette.systemColor3.sys300Main}, 0) 113.73%);`,
        backgroundColor: themes.default?.palette?.systemColor4?.sys100,
        pointRadius: 2,
        pointStyle: 'circle',
        borderWidth: 1,
        tension: 0.5,
      },
      {
        label: 'Dataset 2',
        data: [70, 51, 85, 71, 46, 59, 48],
        borderColor: themes.default?.palette?.systemColor3?.sys300Main,
        pointRadius: 2,
        fill: true,
        backgroundColor: themes.default?.palette?.systemColor3?.sys100,
        pointStyle: 'circle',
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  },
  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
    bar_thickness: 25,
    axis_border_Color: themes.default?.palette?.neutral?.neu100,
    display_grid: { x: true, y: false },
    axis_ticks_color: themes.default?.palette?.text?.tex400,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },
};

export const tableData = {
  columns: [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 200,
      description: 'This column has value of age.',
      sortable: false,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (params: any) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ],
  rows: [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 11, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 12, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 13, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 14, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 15, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 16, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 17, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 18, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 19, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 20, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 21, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 22, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 23, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 24, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 25, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 26, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 27, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
    { id: 28, lastName: 'Shreya', firstName: 'Harvey', age: 66 },
  ],
};
export const barData = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [500, 200, 100, 700, 300, 550, 230],
        backgroundColor: themes.default?.palette?.systemColor1?.sys300Main,
        borderRadius: 5,
      },
      {
        label: 'Dataset 2',
        data: [200, 900, 350, 520, 1000, 330, 440],
        backgroundColor: themes.default?.palette?.systemColor2?.sys300Main,
        borderRadius: 5,
      },
      {
        label: 'Dataset 3',
        data: [200, 900, 350, 520, 1000, 330, 440],
        backgroundColor: themes.default?.palette?.systemColor3?.sys300Main,
        borderRadius: 5,
      },
      {
        label: 'Dataset 3',
        data: [200, 900, 350, 520, 1000, 330, 440],
        backgroundColor: themes.default?.palette?.systemColor4?.sys300Main,
        borderRadius: 5,
      },
    ],
  },
  stacked: true,
  horizontal: true,
  xLabel: 'x',
  yLabel: 'y',
  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
    bar_thickness: 25,
    axis_border_Color: themes.default?.palette?.neutral?.neu100,
    display_grid: { x: true, y: false },
    axis_ticks_color: themes.default?.palette?.text?.tex400,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },
};
export const cardheaderData = {
  title: 'card header',
  actions: [
    {
      menu: 'Preview',
      icon: {
        name: 'fullscreen_black_24dp',
        size: 25,
        color: '#459ff2',
        label: 'Full Screen',
      },
      submenu: [],
    },
    {
      menu: 'Share',
      icon: {
        name: 'share',
        size: 25,
        color: '#459ff2',
        label: 'share',
      },
      submenu: [],
    },
    {
      menu: 'Edit',
      icon: {
        name: 'edit_black_24dp',
        size: 25,
        color: '#459ff2',
        label: 'edit_black_24dp',
      },
      submenu: [],
    },
    {
      menu: 'Close',
      icon: {
        name: 'close_black_24dp',
        size: 25,
        color: '#459ff2',
        label: 'close_black_24dp',
      },
      submenu: [],
    },
  ],
};
// export const lineData2 = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: themes.default.palette?.systemColor1?.main,
//         fill: true,
//         pointRadius: 2,
//         borderWidth: 1,
//         tension: 0.5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [70, 51, 85, 71, 46, 59, 48],
//         borderColor: themes.default.palette?.systemColor2?.main,
//         pointRadius: 2,
//         // fill: true,
//         borderWidth: 1,
//         tension: 0.5,
//       },
//     ],
//   },
// };
// export const scatterData = {
//   labels: ['a', 'b', 'c'],
//   datasets: [
//     {
//       label: 'Red dataset',
//       data: [
//         {
//           x: 21,
//           y: 47,
//           r: 12,
//         },
//         {
//           x: 43,
//           y: 26,
//           r: 17,
//         },
//         {
//           x: 21,
//           y: 18,
//           r: 17,
//         },
//         {
//           x: 49,
//           y: 36,
//           r: 11,
//         },
//         {
//           x: 27,
//           y: 21,
//           r: 16,
//         },
//         {
//           x: 41,
//           y: 38,
//           r: 14,
//         },
//         {
//           x: 15,
//           y: 21,
//           r: 14,
//         },
//         {
//           x: 30,
//           y: 36,
//           r: 12,
//         },
//         {
//           x: 22,
//           y: 42,
//           r: 12,
//         },
//         {
//           x: 21,
//           y: 35,
//           r: 13,
//         },
//         {
//           x: 37,
//           y: 23,
//           r: 10,
//         },
//         {
//           x: 14,
//           y: 28,
//           r: 11,
//         },
//         {
//           x: 16,
//           y: 23,
//           r: 11,
//         },
//         {
//           x: 14,
//           y: 25,
//           r: 12,
//         },
//         {
//           x: 28,
//           y: 13,
//           r: 11,
//         },
//         {
//           x: 10,
//           y: 29,
//           r: 12,
//         },
//       ],
//       backgroundColor: themes.default?.palette?.systemColor1?.main,
//       pointRadius: 2,
//       borderColor: themes.default?.palette?.systemColor1?.main,
//     },
//     {
//       label: 'Blue dataset',
//       data: [
//         {
//           x: 28,
//           y: 23,
//           r: 14,
//         },

//         {
//           x: 10,
//           y: 44,
//           r: 13,
//         },
//         {
//           x: 43,
//           y: 25,
//           r: 17,
//         },
//         {
//           x: 15,
//           y: 38,
//           r: 11,
//         },
//       ],
//       backgroundColor: themes.default?.palette?.systemColor2?.main,
//       pointRadius: 2,
//       borderColor: themes.default?.palette?.systemColor2?.main,
//     },
//   ],
// };

export const bubbleData = {
  labels: ['a', 'b', 'c'],
  datasets: [
    {
      label: 'Red dataset',
      data: [
        {
          x: 48,
          y: 34,
          r: 1,
        },
        {
          x: 22,
          y: 40,
          r: 10,
        },
        {
          x: 48,
          y: 30,
          r: 9,
        },
        {
          x: 11,
          y: 12,
          r: 7,
        },
        {
          x: 29,
          y: 39,
          r: 6,
        },
        {
          x: 22,
          y: 22,
          r: 8,
        },
      ],
      backgroundColor: themes.default?.palette?.systemColor1?.sys100,
      borderColor: themes.default?.palette?.systemColor1?.sys300Main,
    },
    {
      label: 'Blue dataset',
      data: [
        {
          x: 28,
          y: 23,
          r: 5,
        },
        {
          x: 33,
          y: 49,
          r: 7,
        },
        {
          x: 31,
          y: 13,
          r: 10,
        },
        {
          x: 50,
          y: 35,
          r: 2,
        },
        {
          x: 35,
          y: 17,
          r: 3,
        },
        {
          x: 22,
          y: 45,
          r: 5,
        },
        {
          x: 33,
          y: 37,
          r: 8,
        },
      ],
      backgroundColor: themes.default?.palette?.systemColor2?.sys100,
      borderColor: themes.default?.palette?.systemColor2?.sys300Main,
    },
  ],
};
// export const polarData = {
//   labels: [
//     'name-a',
//     'name-b',
//     'name-c',
//     'name-d',
//     'name-e',
//     'name-f',
//     'name-g',
//     'name-h',
//     'name-i',
//     'name-j',
//     'name-k',
//     'name-l',
//     'name-m',
//     'name-n',
//     'name-o',
//     'name-p',
//     'name-q',
//   ],
//   datasets: [
//     {
//       label: 'Red dataset',
//       data: [
//         17, 33, 41, 13, 44, 22, 37, 22, 12, 11, 28, 10, 26, 50, 42, 50, 36,
//       ],
//       backgroundColor: [
//         themes.default?.palette?.systemColor1?.main,
//         themes.default?.palette?.systemColor2?.main,
//         themes.default?.palette?.systemColor3?.main,
//         themes.default?.palette?.systemColor4?.main,
//         themes.default?.palette?.systemColor5?.main,
//         themes.default?.palette?.systemColor1?.c100,
//         themes.default?.palette?.systemColor2?.c100,
//         themes.default?.palette?.systemColor3?.c100,
//         themes.default?.palette?.systemColor4?.c100,
//         themes.default?.palette?.systemColor5?.c100,
//         themes.default?.palette?.systemColor1?.c50,
//         themes.default?.palette?.systemColor2?.c50,
//         themes.default?.palette?.systemColor3?.c50,
//         themes.default?.palette?.systemColor4?.c50,
//         themes.default?.palette?.systemColor5?.c50,
//         themes.default?.palette?.systemColor1?.light,
//         themes.default?.palette?.systemColor2?.light,
//       ],
//     },
//     // {
//     //   label: 'Blue dataset',
//     //   data: [
//     //     21, 49, 43, 28, 22, 22, 27, 31, 50, 21, 32, 20, 37, 45, 24, 49, 27,
//     //   ],
//     //   backgroundColor: ['rgba(53, 162, 235, 0.5)'],
//     // },
//   ],
// };

// export const heatmapData: any = {
//   // rows: 4,
//   // columns: 24,
//   colLabel: '',
//   rowLabel: '',
//   columnAxisLabel: ['11', '22', '33', '44', '55', '66'],
//   rowAxisLabel: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']],
//   data: [
//     [40, 42, 68, 15, 23, 84, 90, 18, 85, 38],
//     [75, 44, 39, 30, 87, 50, 73, 90, 3, 43],
//     [12, 45, 10, 34, 67, 18, 36, 7, 89, 38],
//     [61, 88, 81, 74, 0, 87, 89, 1, 70, 35],
//     [61, 88, 81, 74, 0, 87, 89, 1, 70, 35],
//     // [61, 88, 81, 74, 0, 87, 89, 1, 70, 35],
//   ],
//   threshold: [
//     {
//       name: 'low',
//       value_min: 90,
//       value_max: 100,
//       color: themes.default.palette?.systemColor1?.main,
//     },
//     {
//       name: 'medium',
//       value_min: 75,
//       value_max: 90,
//       color: themes.default.palette?.systemColor2?.main,
//     },
//     {
//       name: 'high',
//       value_min: 0,
//       value_max: 75,
//       color: themes.default.palette?.systemColor3?.main,
//     },
//   ],
// };

export const doughnutData = {
  data: {
    labels: ['Blue', 'Red', 'Purple', 'Green', 'Yello'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          themes.default?.palette?.systemColor1?.sys300Main,
          themes.default?.palette?.systemColor2?.sys300Main,
          themes.default?.palette?.systemColor3?.sys300Main,
          themes.default?.palette?.systemColor4?.sys300Main,
          themes.default?.palette?.systemColor5?.sys300Main,
        ],

        borderWidth: 1,
      },
    ],
  },

  fontData: {
    families: ['poppins', 'Indie Flower', 'Raleway'],
    url: [
      'https://fonts.googleapis.com/css?family=Poppins',
      'https://fonts.googleapis.com/css?family=Indie+Flower',
      'https://fonts.googleapis.com/css?family=Raleway',
    ],
    defaultFont: 'poppins',
  },
  legend: 'right',
  chartProps: {
    doughnut_cutout: '80%',
    doughnut_radius: '100%',
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex400,
  },
};

export const piechartData = {
  height: 400,
  width: 600,
  legend: 'right',
  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },

  data: {
    labels: ['Blue', 'Red', 'Purple', 'Green', 'Yello'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          themes.default?.palette?.systemColor1?.sys200,
          themes.default?.palette?.systemColor2?.sys200,
          themes.default?.palette?.systemColor3?.sys200,
          themes.default?.palette?.systemColor4?.sys200,
          themes.default?.palette?.systemColor5?.sys200,
        ],

        borderWidth: 1,
      },
    ],
  },
};

export const radarData = {
  data: {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
    ],
    datasets: [
      {
        label: '1st Dataset',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: themes.default?.palette?.systemColor4?.sys300Main,
        borderColor: themes.default?.palette?.systemColor1?.sys300Main,
        borderWidth: 1,
      },
      {
        label: '2nd Dataset',
        data: [9, 2, 7, 8, 1, 5],
        backgroundColor: themes.default?.palette?.systemColor5?.sys300Main,
        borderColor: themes.default?.palette?.systemColor3?.sys300Main,
        borderWidth: 1,
      },
    ],
  },
  fontData: {
    families: ['poppins', 'Indie Flower', 'Raleway'],
    url: [
      'https://fonts.googleapis.com/css?family=Poppins',
      'https://fonts.googleapis.com/css?family=Indie+Flower',
      'https://fonts.googleapis.com/css?family=Raleway',
    ],
    defaultFont: 'poppins',
  },
  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },
};

export const scatterData = {
  labels: ['a', 'b', 'c'],
  datasets: [
    {
      label: 'Red dataset',
      data: [
        {
          x: 40,
          y: 34,
          r: 17,
        },
      ],
      backgroundColor: themes.default?.palette?.systemColor1?.sys300Main,
      pointRadius: 5,
    },
    {
      label: 'Blue dataset',
      data: [
        {
          x: 38,
          y: 23,
          r: 14,
        },
      ],
      backgroundColor: themes.default?.palette?.systemColor2?.sys300Main,
      pointRadius: 5,
    },
  ],
  chartProps: {
    chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
    chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
    axis_border_Color: themes.default?.palette?.neutral?.neu100,
    display_grid: { x: true, y: false },
    axis_ticks_color: themes.default?.palette?.text?.tex400,
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex600,
  },
};
export const polarData = {
  fontData: {
    families: ['poppins', 'Indie Flower', 'Raleway'],
    url: [
      'https://fonts.googleapis.com/css?family=Poppins',
      'https://fonts.googleapis.com/css?family=Indie+Flower',
      'https://fonts.googleapis.com/css?family=Raleway',
    ],
    defaultFont: 'Raleway',
  },

  labels: [
    'name-a',
    'name-b',
    'name-c',
    'name-d',
    'name-e',
    'name-f',
    'name-g',
    'name-h',
    'name-i',
    'name-j',
    'name-k',
    'name-l',
    'name-m',
    'name-n',
    'name-o',
    'name-p',
    'name-q',
  ],
  datasets: [
    {
      label: 'Red dataset',
      data: [
        17, 33, 41, 13, 44, 22, 37, 22, 12, 11, 28, 10, 26, 50, 42, 50, 36,
      ],
      backgroundColor: [
        themes.default?.palette?.systemColor1?.sys300Main,
        themes.default?.palette?.systemColor2?.sys300Main,
        themes.default?.palette?.systemColor3?.sys300Main,
        themes.default?.palette?.systemColor4?.sys300Main,
        themes.default?.palette?.systemColor5?.sys300Main,
        themes.default?.palette?.systemColor1?.sys100,
        themes.default?.palette?.systemColor2?.sys100,
        themes.default?.palette?.systemColor3?.sys100,
        themes.default?.palette?.systemColor4?.sys100,
        themes.default?.palette?.systemColor5?.sys100,
        themes.default?.palette?.systemColor1?.sys400,
        themes.default?.palette?.systemColor2?.sys400,
        themes.default?.palette?.systemColor3?.sys400,
        themes.default?.palette?.systemColor4?.sys400,
        themes.default?.palette?.systemColor5?.sys400,
        themes.default?.palette?.systemColor1?.sys600,
        themes.default?.palette?.systemColor2?.sys600,
      ],
    },
    // {
    //   label: 'Blue dataset',
    //   data: [
    //     21, 49, 43, 28, 22, 22, 27, 31, 50, 21, 32, 20, 37, 45, 24, 49, 27,
    //   ],
    //   backgroundColor: ['rgba(53, 162, 235, 0.5)'],
    // },
  ],
  chartProps: {
    background_color: themes.default?.palette?.background?.bacopWhite,
    legend_text_color: themes.default?.palette?.text?.tex400,
  },
};
