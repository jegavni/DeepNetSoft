import Navbar  from "./Components/Navbar";
import { MenuPage } from "./Pages/MenuPage";
import Secondary from "./Pages/Secondary";  
import FooterSection from "./Pages/Footersection";
function App() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Navbar on top */}
      <Navbar />

      {/* Main content */}
      <main className="p-4">
        <MenuPage  />
        <Secondary />
        <FooterSection />


      </main>
    </div>
  );
}

export default App;