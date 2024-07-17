import { Lightbulb } from "lucide-react";
import { ChartHome } from "./components/chart-home";
import Navbar from "./components/navbar";
import Slogan from "./components/slogan";
import { Button } from "./components/ui/button";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-20">
          <Slogan />
          <div className="my-10"></div>
          <ChartHome />

          <Button>
            <Lightbulb className="w-4 h-4 mr-2" /> Explore more!
          </Button>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
