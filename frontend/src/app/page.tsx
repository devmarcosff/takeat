import FooterCart from "@/components/footerCart";
import Header from "@/components/headers/header.home.component";
import MainApp from "@/components/main";
import Menu from "@/components/menu/menu.component";

export default function App() {
  return (
    <div className="m-2">
      <Header />
      <MainApp />
      <Menu />
      {/* <FooterCart /> */}
    </div>
  )
}