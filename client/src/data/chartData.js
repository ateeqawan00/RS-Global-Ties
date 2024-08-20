export const dashboardMiniStats = [
  {
    title: "Total Users",
    value: "78,925",
    data: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },

      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
    series: [
      {
        name: "New users",
        data: [0, 200, 400, 250, 600, 700, 800, 1300, 850, 2000],
        color: "#1A56DB",
      },
    ],
  },
  {
    title: "Total Visitor",
    value: "8,925",
    data: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },

      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
    series: [
      {
        name: "New users",
        data: [0, 200, 400, 250, 600, 700, 800, 1300, 850, 2000],
        color: "#1A56DB",
      },
    ],
  },
  {
    title: "Total Revenue",
    value: "$85,000",
    data: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },

      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
    series: [
      {
        name: "New users",
        data: [0, 200, 400, 250, 600, 700, 800, 1300, 850, 2000],
        color: "#1A56DB",
      },
    ],
  },
];

export const columnChartData = {
  colors: ["#1A56DB"],
  series: [
    {
      name: "Organic",
      color: "#1A56DB",
      data: [
        { x: "1", y: 100 },
        { x: "2", y: 150 },
        { x: "4", y: 120 },
        { x: "6", y: 250 },
        { x: "8", y: 220 },
        { x: "10", y: 400 },
        { x: "12", y: 250 },
        { x: "14", y: 200 },
        { x: "16", y: 250 },
        { x: "18", y: 120 },
        { x: "20", y: 220 },
        { x: "22", y: 250 },
        { x: "24", y: 200 },
        { x: "26", y: 350 },
        { x: "28", y: 220 },
        { x: "30", y: 300 },
      ],
    },
  ],
  chart: {
    type: "bar",
    height: "320px",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "15%",
      borderRadius: 2,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};

export const donutChartData = {
  series: [23, 35, 35, 30],
  colors: ["#2F80ED", "#FF392B", "#FF8901", "#00C3F8"],
  chart: {
    type: "donut",
  },
  stroke: {
    colors: ["transparent"],
    lineCap: "",
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: false,
            fontFamily: "Inter, sans-serif",
          },
          total: {
            showAlways: true,
            show: true,
            offsetY: -10,
            fontFamily: "Inter, sans-serif",
            formatter: function (w) {
              const sum = w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
              return parseInt(sum);
            },

            fontSize: "30px", // Set the font size for total label
          },
          value: {
            show: true,
            fontFamily: "Inter, sans-serif",
            formatter: function (value) {
              return parseInt(value);
            },

            fontSize: "30px",
          },
        },
        size: "80%",
      },
    },
  },
  grid: {
    padding: {
      top: -2,
    },
  },
  labels: ["Seller", "Buyer", "Business", "B2B"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
    fontFamily: "Inter, sans-serif",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value;
      },
    },
  },
  xaxis: {
    labels: {
      formatter: function (value) {
        return value;
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
};
export const statsChartData = {
  // set this option to enable the tooltip for the chart, learn more here: https://apexcharts.com/docs/tooltip/
  tooltip: {
    enabled: true,
    x: {
      show: true,
    },
    y: {
      show: true,
    },
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -26,
    },
  },
  series: [
    {
      name: "Developer Edition",
      data: [0, 500, 1000, 750, 2000, 1500, 2200, 3000, 4500],
      color: "#1A56DB",
    },
  ],
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 4,
  },
  xaxis: {
    categories: [
      "01 February",
      "02 February",
      "03 February",
      "04 February",
      "05 February",
      "06 February",
      "07 February",
      "04 February",
      "05 February",
      "06 February",
      "07 February",
    ],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value) {
        return "$" + value;
      },
    },
  },
};
