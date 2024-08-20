import { useEffect, useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { superServicesTabsData } from "../../data/superProductPageData"
import SuperAddServicePage from "./SuperAddServicePage"
import SuperMyServicesPage from "./SuperMyServicesPage"
import { Helmet } from "react-helmet"

export default function SuperServicesPage() {
  const [activeTab, setActiveTab] = useState("allServices")

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Helmet>
        <title>{`Super service - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <Tabs value={activeTab} className='p-4'>
        <TabsHeader className=' gap-2'>
          {superServicesTabsData.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleTabClick(value)}
              className={`py-2 px-4 ${
                activeTab === value
                  ? "text-primary border-b border-primary"
                  : "bg-inherit"
              } `}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {superServicesTabsData.map(({ value }) => (
            <TabPanel
              key={value}
              value={value}
              className='p-4 flex flex-wrap items-center justify-start 500px:text-nowrap gap-8'
            >
              {value === "allServices" && <SuperMyServicesPage />}
              {value === "addService" && <SuperAddServicePage />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  )
}
