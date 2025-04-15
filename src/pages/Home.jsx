
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "../components/LatestJobs";
import HowJobs from "../components/HowJobs";
import Footer from "../components/shared/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <HowJobs/>
      <Footer/>
    </div>
  )
}

export default Home