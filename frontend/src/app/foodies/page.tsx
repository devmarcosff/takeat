import FooterCart from "@/components/footerCart";
import Header from "@/components/header";
import Carousel from "@/components/main";
import MainApp from "@/components/main";

export default function Foodies() {
  return (
    <div>
      <div className="mx-2 mt-2">
        <Header />
      </div>
      <Carousel />
      <FooterCart />
    </div>
  )
}