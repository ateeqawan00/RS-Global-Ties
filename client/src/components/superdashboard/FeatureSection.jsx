import { plans } from "../../data/featuresPageData";

const FeatureSection = () => {
  return (
    <div className="  mx-auto flex flex-wrap ">
      <div className="lg:w-1/4  hidden 1200px:block">
        <div className="flex flex-col items-start gap-4 mb-20 mt-4 ">
          <h1 className="text-[2rem] font-semibold">Features</h1>
          <button className="border border-primary px-10 rounded-md text-primary py-2 font-semibold">
            Add Feature{" "}
          </button>
        </div>
        <div className="mt-px rounded-tl-lg rounded-bl-lg overflow-hidden">
          <p className=" text-gray-900 h-12 font-[500] text-start flex items-center justify-start -mt-px">
            Complete Business Profile
          </p>
          <p className="text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Member Icon
          </p>
          <p className=" text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Products Display on our Website
          </p>
          <p className="text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Online & Showcase Product
          </p>
          <p className=" text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Display Factory Images
          </p>
          <p className="text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Complete Product Catalog
          </p>
          <p className=" text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Video Ad Features{" "}
          </p>
          <p className="text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Online & Showcase Product
          </p>

          <p className=" text-gray-900 h-12 font-[500] text-start  flex items-center justify-start">
            Complete Business Profile
          </p>
        </div>
      </div>
      <div className="flex items-center lg:w-3/4 w-full flex-wrap  lg:border border-gray-300 rounded-lg">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="  min-w-[200px] flex-grow  lg:w-1/4 md:w-1/3 sm:w-1/2 lg:mt-px w-full text-nowrap  mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none"
          >
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest">{plan.title}</h3>
              <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">
                {plan.price}
              </h2>
              <span className="text-sm text-gray-600">{plan.duration}</span>
            </div>

            {plan.features.map((feature, i) => (
              <p
                key={i}
                className={`${
                  i === plan.features.length - 1 ? "" : "border-b-0"
                } text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center`}
              >
                {feature}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
