"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturedDeals from "@/components/home/FeaturedDeals";
import PopularDestinations from "@/components/home/PopularDestinations";
import CallBanner from "@/components/home/CallBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDeals />
      <CallBanner />
      <PopularDestinations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
