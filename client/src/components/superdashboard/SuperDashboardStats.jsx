import ReactApexChart from "react-apexcharts";
import { donutChartData, statsChartData } from "../../data/chartData";
import { FaAngleDown } from "react-icons/fa6";

const SuperDashboardStats = () => {
  return (
    <div className="flex items-stretch justify-center gap-4 flex-wrap ">
      <div className="  w-[49%]  flex-grow flex flex-col justify-between  bg-white rounded-lg shadow  p-4 md:p-6">
       <div className="p-2">
       <h1 className="p-2 text-[1.4rem] font-[500]">Revenue By Device</h1>
       <p className="text-gray-400 p-2">Revenue Statistics By User Agents</p>
       </div>
        <ReactApexChart
          series={donutChartData.series}
          type="donut"
          options={donutChartData}
          height={400}
        />
      </div>
      <div className=" w-[49%]  flex-grow bg-white rounded-lg shadow  p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.4rem] font-[500]">Traffic </h1>
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
        <div className=" flex flex-wrap flex-col 500px:flex-row items-center justify-between gap-2 p-2 text-nowrap">
          <div className="p-4 w-full 500px:w-[45%] rounded-md shadow-md flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400">Active Users</h3>
              <span className="text-primary font-semibold">+22%</span>
            </div>
            <h1 className="font-inter text-xl">8950</h1>
          </div>
          <div className="p-4 w-full 500px:w-[45%] rounded-md shadow-md flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400">Active Visitors</h3>
              <span className="text-primary font-semibold">-24%</span>
            </div>
            <h1 className="font-inter text-xl">1520</h1>
          </div>
        </div>
        <ReactApexChart
          series={statsChartData.series}
          type="area"
          options={statsChartData}
          height={320}
        />
      </div>
    </div>
  );
};

export default SuperDashboardStats;
