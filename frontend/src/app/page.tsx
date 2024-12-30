import FooterCart from "@/components/footerCart";
import Header from "@/components/header";
import MainApp from "@/components/main";

export default function App() {
  return (
    <div>
      <div className="mx-2 mt-2">
        <Header />
      </div>
      <MainApp />
      {/* <FooterCart /> */}
    </div>
  )
}