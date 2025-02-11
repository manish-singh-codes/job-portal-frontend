"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const categories = [
  "Software Engineer",
  "Web Developer",
  "Python Developer",
  "Java Developer",
  "Data Scientist",
  "UI/UX Designer",
  "DevOps Engineer",
  "Full Stack Developer",
]

const CategoryCarousel = () => {
  return (
    <div className="relative px-4 sm:px-6 md:px-8">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Button
                variant="outline"
                className="w-full rounded-full text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
          <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
          <CarouselNext className="absolute right-0 translate-x-1/2" />
        </div>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel

