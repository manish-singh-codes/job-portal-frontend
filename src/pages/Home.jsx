import { Input } from "@/components/ui/input";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "../components/LatestJobs";
import HowJobs from "../components/HowJobs";

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <HowJobs/>
      
    </div>
  )
}

export default Home