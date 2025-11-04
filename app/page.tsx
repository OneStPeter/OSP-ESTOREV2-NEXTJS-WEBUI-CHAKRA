import Hero from "./sections/hero";
import Services from "./sections/services";
import Products from "./sections/products";
import Location from "./sections/location";
import AboutUs from "./sections/aboutus";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Location />
      <AboutUs />
    </>
  );
}
