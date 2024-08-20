export const dashboardSidebarData = [
  {
    type: "list",
    title: "Profile",
    path: "/dashboard/profile",
    subItems: [
      { title: "User Profile", path: "/dashboard/user-profile" },
      { title: "Company Profile", path: "/dashboard/company-information" },
    ],
  },
  {
    type: "list",
    title: "Requirement",
    path: "/dashboard/requirement",
    subItems: [
      { title: "Add Requirement", path: "/dashboard/add-a-requirement" },
      { title: "Requirement History", path: "/dashboard/requirement-history" },
    ],
  },
  {
    title: "Business Documents",
    path: "/dashboard/business-verification",
  },
  {
    title: "Account Setting",
    path: "/dashboard/account-setting",
  },
  {
    type: "list",
    title: "Selling",
    path: "/dashboard/selling",
    subItems: [
      { title: "Sell Products", path: "/dashboard/add-product" },
      { title: "My Products", path: "/dashboard/my-products" },
    ],
  },
  {
    type: "list",
    title: "Services",
    path: "/dashboard/services",
    subItems: [
      { title: "Add Services", path: "/dashboard/add-a-service" },
      { title: "Add Services as Provider", path: "/dashboard/add-a-service-as-provider" },
      { title: "My Services", path: "/dashboard/services-history" },
    ],
  },

];
