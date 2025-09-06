import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectionLayer from "./components/ProtectionLayer";
import ProtectionMeta from "./components/ProtectionMeta";



// Main App Component
const App = () => {
  return (
    <Router>
      {/* Protection Layer */}
      <ProtectionLayer />
      <ProtectionMeta />

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Navigation */}
        {/* <MobileNavigation /> */}

        {/* Header Section - Responsive */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[10%]">
          {/* <Logo /> */}
          <HeaderText />
          {/* <HeaderExt /> */}
        </div>

        {/* Main Content Area - Responsive Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          {/* <aside className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar />
          </aside> */}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Routes>
               <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/submit" element={<SubmitPage />} /> 
             
            </Routes>
          </main>

          {/* Right Sidebar - Hidden on mobile and tablet, visible on desktop */}
          {/* <aside className="hidden xl:block w-80 flex-shrink-0">
            <SidebarRightWithModal />
          </aside> */}
        </div>

        {/* Watermark Overlay */}
        {/* <WatermarkOverlay /> */}
      </div>
    </Router>
  );
};

export default App;
