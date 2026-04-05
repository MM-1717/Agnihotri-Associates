
import HeroCarousel from "./HomePage/Hero";
import AboutIntro from "./HomePage/About";
import HomeServices from "./HomePage/HomeServices";
import WhyChooseUs from "./HomePage/WhyChooseUs";
import Krilekha from "./HomePage/Krilekha";

export default function HomePage() {
  return (<>
    <div className="Homepage">
      <HeroCarousel />
      <AboutIntro />
      <HomeServices/>
      <Krilekha />
      <WhyChooseUs/>
    </div>
    
    
    </>
  );
}
