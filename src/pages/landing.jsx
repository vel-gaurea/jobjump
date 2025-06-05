import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Landing = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-4xl font-extrabold sm:text-6xl  lg:text-8xl tracking-tighter py-4'>Find your Dream Job{" "}
          <span className='flex items-center gap-2 lg:gap-6'>and get{" "} HIRED</span></h1>

        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
        {/* buttons */}
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant={"destructive"} size={"xl"}>Post a Job</Button>
        </Link>
      </div>
      {/* carousal */}
      <Carousel className="w-full py-10" plugins={[Autoplay({ delay: 2000 })]}>
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-10 sm:h-14 object-contain min-w-[64px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>


      {/* banner */}
      <img src='/banner2.png' className="w-full" />

      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* cards */}
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>

      </section>

      {/* Accordion */}

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>


    </main>
  )
}

export default Landing
