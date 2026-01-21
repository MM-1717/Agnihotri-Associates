
import HeroCarousel from "./HomePage/Hero";
import AboutIntro from "./HomePage/About";
import HomeServices from "./HomePage/HomeServices";
import WhyChooseUs from "./HomePage/WhyChooseUs";
import TeamPage from "./team/page";

export default function HomePage() {
  return (<>
    <div className="Homepage">
      <HeroCarousel />
      <AboutIntro />
      <HomeServices/>
      <WhyChooseUs/>
    </div>
    
    <div className="Service"> </div>

    <div className="Team">
      
    </div>
    </>
  );
}
