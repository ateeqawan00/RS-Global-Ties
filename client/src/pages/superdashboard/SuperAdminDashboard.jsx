import { dashboardMiniStats } from "../../data/chartData.js"
import StatsCards from "../../components/superdashboard/StatsCards.jsx"
import CandlestickChart from "../../components/superdashboard/CandleStickChart.jsx"
import SuperDashboardStats from "../../components/superdashboard/SuperDashboardStats.jsx"
import { Helmet } from "react-helmet"

const SuperAdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>{`Super admin dashboard - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='w-full '>
        <h1 className='self-start text-[2rem] font-bold mb-5'>Dashboard</h1>
        <div className='flex items-center justify-center gap-3 flex-wrap  w-full mb-2'>
          {dashboardMiniStats.map((item, key) => (
            <StatsCards key={key} item={item} />
          ))}
        </div>
        <CandlestickChart />
        <SuperDashboardStats />
      </div>
    </>
  )
}

export default SuperAdminDashboard
