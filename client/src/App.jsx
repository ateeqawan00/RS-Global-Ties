import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import "./utils/Loader.css"
import LoaderPage from "./utils/LoaderPage"
import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

// Lazy-loaded components
const Login = lazy(() => import("./pages/auth/Login"))
const SignUp = lazy(() => import("./pages/auth/SignUp"))
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"))
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"))
const Layout = lazy(() => import("./utils/layouts/Layout"))
const Home = lazy(() => import("./pages/home/Home"))
const SearchPage = lazy(() => import("./pages/search/SearchPage"))
const ProductPage = lazy(() => import("./pages/products/ProductPage"))
const DashboardLayout = lazy(() => import("./utils/layouts/DashboardLayout"))
const UserProfile = lazy(() => import("./pages/dashboard/UserProfile"))
const CompanyInformationPage = lazy(() =>
  import("./pages/dashboard/CompanyInformationPage")
)

const Categories = lazy(() => import("./pages/home/Categories"))

const AccountSetting = lazy(() => import("./pages/dashboard/AccountSetting"))
const RequirementHistory = lazy(() =>
  import("./pages/dashboard/RequirementHistory")
)
const ServicesHistory = lazy(() => import("./pages/dashboard/ServicesHistory"))
const AddRequirement = lazy(() => import("./pages/dashboard/AddRequirement"))
const AddService = lazy(() => import("./pages/dashboard/AddService"))
const DashboardPricing = lazy(() =>
  import("./pages/dashboard/DashboardPricing")
)
const BusinessVerification = lazy(() =>
  import("./pages/dashboard/BusinessVerification")
)
const AddProduct = lazy(() => import("./pages/dashboard/AddProduct"))
const MyProducts = lazy(() => import("./pages/dashboard/MyProducts"))
const SuperDashboardLayout = lazy(() =>
  import("./utils/layouts/SuperDashboardLayout")
)
const SuperAccountSetting = lazy(() =>
  import("./pages/superdashboard/SuperAccountSetting")
)
const SuperAdminDashboard = lazy(() =>
  import("./pages/superdashboard/SuperAdminDashboard")
)
const SuperUsersList = lazy(() =>
  import("./pages/superdashboard/SuperUsersList")
)
const SuperFeatures = lazy(() => import("./pages/superdashboard/SuperFeatures"))
const SuperUserProfile = lazy(() =>
  import("./pages/superdashboard/SuperUserProfile")
)
const SuperSuccessStories = lazy(() =>
  import("./pages/superdashboard/SuperSuccessStories")
)
const SuperCompanyInfo = lazy(() =>
  import("./pages/superdashboard/SuperCompanyInfo")
)
const SuperProduct = lazy(() => import("./pages/superdashboard/SuperProduct"))
const SuperRequirementsPage = lazy(() =>
  import("./pages/superdashboard/SuperRequirementsPage")
)
const SuperServicesPage = lazy(() =>
  import("./pages/superdashboard/SuperServicesPage")
)
const AddCarousalPage = lazy(() =>
  import("./pages/superdashboard/AddCarousalPage")
)
const SuperProductListsPage = lazy(() =>
  import("./pages/superdashboard/SuperProductListsPage")
)
const SuperUpdateProduct = lazy(() =>
  import("./pages/superdashboard/SuperUpdateProduct")
)
const SuperChatLayout = lazy(() => import("./utils/layouts/SuperChatLayout"))
const Otp = lazy(() => import("./pages/auth/Otp"))
const AddCompanyInfo = lazy(() => import("./pages/dashboard/AddCompanyInfo"))
const ProductDetailsPage = lazy(() =>
  import("./pages/products/ProductDetailsPage")
)
const PaymentSuccessful = lazy(() =>
  import("./pages/payment/PaymentSuccessful")
)
const PaymentCancelled = lazy(() => import("./pages/payment/PaymentCancelled"))
const CategoriesTabs = lazy(() => import("./components/home/CategoriesTabs"))
const CategoriesTabs2 = lazy(() => import("./components/home/CategoriesTabs2"))
const CategoriesByCountry = lazy(() =>
  import("./components/home/CategoriesByCountry")
)
const CategoriesByPlatinumMember = lazy(() =>
  import("./components/home/CategoriesByPlatinumMember")
)

const PrivacyPolicy = lazy(() => import("./pages/company/PrivacyPolicy"))
const PricingPage = lazy(() => import("./pages/pricing/PricingPage"))
const Services = lazy(() => import("./pages/company/Services"))
const ContactUs = lazy(() => import("./pages/company/ContactUs"))
const AddServiceAsProvider = lazy(() =>
  import("./pages/dashboard/AddServiceAsProvider")
)

function App() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        {/* <Route path='/auth' element={<AuthLayout />}> */}
        <Route path='forgot-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='otp' element={<Otp />} />
        {/* </Route> */}
        <Route path='/' element={<Layout />}>
          <Route element={<Home />} index />
          <Route path='search' element={<SearchPage />} />
          <Route path='product' element={<ProductPage />} />
          <Route path='categories' element={<Categories />} />

          <Route path='/product/:productId' element={<ProductDetailsPage />} />
          <Route path='pricing' element={<PricingPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<ContactUs />} />
          {/* <Route path='/category' element={<CategoriesTabs />} /> */}
          <Route path='/category/:filterParam' element={<CategoriesTabs />} />
          <Route
            path='/category/:filterParam/:userType'
            element={<CategoriesTabs2 />}
          />
          <Route
            path='/category/filter-by-country/:country'
            element={<CategoriesByCountry />}
          />
          <Route
            path='/category/filter-by-platinum-members/:planKey'
            element={<CategoriesByPlatinumMember />}
          />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<UserProfile />} />
          <Route path='user-profile' element={<UserProfile />} />
          <Route
            path='company-information'
            element={<CompanyInformationPage />}
          />
          <Route path='account-setting' element={<AccountSetting />} />
          <Route path='requirement-history' element={<RequirementHistory />} />
          <Route path='services-history' element={<ServicesHistory />} />
          <Route path='add-a-requirement' element={<AddRequirement />} />
          <Route path='add-a-service' element={<AddService />} />
          <Route
            path='add-a-service-as-provider'
            element={<AddServiceAsProvider />}
          />
          <Route path='pricing' element={<DashboardPricing />} />
          <Route
            path='business-verification'
            element={<BusinessVerification />}
          />
          <Route path='payment-successful' element={<PaymentSuccessful />} />
          <Route path='payment-cancelled' element={<PaymentCancelled />} />

          <Route path='chat' element={<SuperChatLayout />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='my-products' element={<MyProducts />} />
          <Route path='add-company-info' element={<AddCompanyInfo />} />
        </Route>
        <Route path='/admin' element={<SuperDashboardLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path='dashboard' element={<SuperAdminDashboard />} />
          <Route path='account-setting' element={<SuperAccountSetting />} />
          <Route path='profile' element={<SuperUserProfile />} />
          <Route path='users-list' element={<SuperUsersList />} />
          <Route path='features' element={<SuperFeatures />} />
          <Route path='company-information' element={<SuperCompanyInfo />} />
          <Route path='products' element={<SuperProduct />} />
          <Route
            path='edit-product/:productId'
            element={<SuperUpdateProduct />}
          />
          <Route path='requirements' element={<SuperRequirementsPage />} />
          <Route path='services' element={<SuperServicesPage />} />
          <Route path='add-carousal' element={<AddCarousalPage />} />
          <Route path='product-lists' element={<SuperProductListsPage />} />
          <Route path='add-company-info' element={<AddCompanyInfo />} />
          <Route path='success-stories' element={<SuperSuccessStories />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
