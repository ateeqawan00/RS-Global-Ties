import { useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { superProductsTabsData } from "../../data/superProductPageData"
import SuperAddProductPage from "./SuperAddProductPage"
import SuperMyProductsPage from "./SuperMyProductsPage"
import { Helmet } from "react-helmet"
export default function SuperProduct() {
  const [activeTab, setActiveTab] = useState("allProducts")

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Helmet>
        <title>{`Super products - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <Tabs value={activeTab} className='400px:p-4'>
        <TabsHeader className=' gap-2'>
          {superProductsTabsData.map(({ label, value }) => (
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
          {superProductsTabsData.map(({ value }) => (
            <TabPanel
              key={value}
              value={value}
              className='p-4 flex flex-wrap items-center justify-start 500px:text-nowrap gap-8'
            >
              {value === "allProducts" && <SuperMyProductsPage />}
              {value === "addProduct" && <SuperAddProductPage />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  )
}
