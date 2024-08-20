
//testing

//new testing
//thisnis new comment
import { ourTeamData } from "../../data/homepageData";
const OurTeam = () => {
  return (
    <div>
      <p className="text-center bg-gradient-to-r from-[#F26921] to-[#d12f35] ml-4 text-transparent bg-clip-text font-bold text-[1.5rem]">
        Our Team
      </p>
      <div className="bg-[#ECF0F9] p-4 w-full">
        <div className="carousel carousel-center rounded-box flex 500px:gap-[9rem] gap-[5rem] p-6 ">
          {ourTeamData.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="carousel-item w-[150px] h-[150px]">
                <img
                  src={item.imageSrc}
                  alt="carousel-img"
                  className=" w-full h-full object-cover rounded-full "
                />
              </div>
              <h1 className="mt-2 font-semibold">{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
