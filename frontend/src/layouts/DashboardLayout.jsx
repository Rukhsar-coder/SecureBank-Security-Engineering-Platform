import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 p-10">
        {/* TOP NAVBAR */}

        <div className="mb-10">
          <TopNavbar />
        </div>

        {/* PAGE CONTENT */}

        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
