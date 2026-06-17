import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Destinations } from "@/components/home/Destinations";
import { Hotels, Restaurants } from "@/components/home/HotelsRestaurants";
import { Events } from "@/components/home/Events";
import { Tour360, MonumentsPresenter } from "@/components/home/Tour360";
import { MapSection } from "@/components/home/MapSection";
import { Booking } from "@/components/home/Booking";
import { AIChat } from "@/components/home/AIChat";
import { NewsSection, FAQSection, ContactSection, PartnersSection } from "@/components/home/Extras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartTour 360 — O'zbekiston rasmiy turizm portali" },
      { name: "description", content: "Virtual 360° sayohatlar, mehmonxonalar, restoranlar, tadbirlar, taksi va chiptalar — bitta premium platformada." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <Hotels />
      <Restaurants />
      <Events />
      <Tour360 />
      <MonumentsPresenter />
      <MapSection />
      <Booking />
      <AIChat />
      <NewsSection />
      <PartnersSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
