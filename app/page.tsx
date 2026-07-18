
import AboutPage from "./about/page";
import Banner from "./component/Banner";
import ContactPage from "./component/Contact";
import FeaturedPlans from "./component/Feature";


export default function Home() {
  return (
  <div>
    <Banner />
    <FeaturedPlans/>
    <ContactPage/>
  </div>
  );
}
