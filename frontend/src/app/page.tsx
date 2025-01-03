import Header from "../components/Headers/header.home.component";
import MainApp from "@/components/main";
import Menu from "../components/Menu/menu.component";

export default function App() {
  return (
    <div className="m-2">
      <Header />
      <MainApp />
      <Menu />
    </div>
  )
}