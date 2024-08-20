/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

const StatsCards = ({ item }) => {
  return (
    <div className=" flex-grow  h-[108px] flex items-center justify-between p-4 shadow-md rounded-md">
      <div className="flex items-center flex-col justify-start gap-2">
        <h2 className="text-md text-gray-400 font-semibold">{item.title}</h2>
        <h1 className="text-2xl font-bold">{item.value}</h1>
      </div>
      <div className="relative">
        <ReactApexChart
          options={item.data}
          series={item.series}
          type="area"
          height={80}
          width={120}
        />
        <div className=" flex items-center  text-base font-semibold text-green-500 dark:text-green-500 text-center absolute top-0 right-0">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
