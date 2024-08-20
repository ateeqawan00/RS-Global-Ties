import ReactApexChart from "react-apexcharts";
import { columnChartData } from "../../data/chartData";
import { FaAngleDown } from "react-icons/fa6";

const CandleStickChart = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-xl  p-4 md:p-12 mb-2">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-[1.4rem] font-[500]">Revenue Stats </h1>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="px-4 py-2 bg-base-200 rounded-md flex items-center gap-2"
          >
            <p> Month</p>
            <FaAngleDown size={20} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Day</a>
            </li>
            <li>
              <a>Week</a>
            </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        series={columnChartData.series}
        type="bar"
        options={columnChartData}
        height={320}
        width={"100%"}
      />
    </div>
  );
};

export default CandleStickChart;
