import { useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { superRequirementsTabsData } from "../../data/superProductPageData"
import SuperAddRequirementsPage from "./SuperAddRequirementsPage"
import SuperMyRequirementsPage from "./SuperMyRequirementsPage"
import { Helmet } from "react-helmet"
export default function SuperRequirementsPage() {
  const [activeTab, setActiveTab] = useState("allRequirements")

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Helmet>
        <title>{`Super requirements - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <Tabs value={activeTab} className='400px:p-4'>
        <TabsHeader className=' gap-2'>
          {superRequirementsTabsData.map(({ label, value }) => (
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
          {superRequirementsTabsData.map(({ value }) => (
            <TabPanel
              key={value}
              value={value}
              className='p-4 flex flex-wrap items-center justify-start 500px:text-nowrap gap-8'
            >
              {value === "allRequirements" && <SuperMyRequirementsPage />}
              {value === "addRequirement" && <SuperAddRequirementsPage />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  )
}
