import { subscriptionData } from "../../data/subscriptionData";
const UserSubscriptionList = () => {
  return (
    <div className="w-full mt-14">
      <div className="flex items-center justify-between w-full flex-wrap">
        <h1 className="p-2 font-inter text-xl font-[500]">
          Customer By Subscription
        </h1>
        <div className="flex items-center justify-between ">
          <div className="relative flex items-center  h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white  uppercase bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptionData.map((item, index) => (
              <tr
                className="bg-white text-black font-[500]  text-nowrap "
                key={index}
              >
                <td className="px-6 py-4 underline hover:cursor-pointer text-primary">
                  {item.id}
                </td>
                <td className="px-6 py-4">{item.product}</td>

                <td className="px-6 py-4">{item.customer}</td>
                <td className="px-6 py-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSubscriptionList;
