import { supplierCarouselData } from "../../data/homepageData";
const PremiumSuppliers = () => {
  return (
    <div>
      <p className="text-center bg-gradient-to-r from-[#F26921] to-[#d12f35] ml-4 mb-4 text-[1.5rem] text-transparent bg-clip-text font-bold ">
        Our Premium Suppliers
      </p>
      <div className=" p-4 w-full bg-[#ECF0F9]">
        <div className="carousel carousel-center  flex gap-4 p-6 ">
          {supplierCarouselData.map((item) => (
            <div
              className="carousel-item w-[182px] h-[88px] relative bg-gray-500/60 rounded-md"
              key={item.id}
            >
              <img
                src={item.imageSrc}
                alt="carousel-img"
                className="rounded-md  w-full h-full object-cover mix-blend-overlay "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumSuppliers;
