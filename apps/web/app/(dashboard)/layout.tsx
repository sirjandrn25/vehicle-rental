import Navbar from "@components/layout/navbar.component";
import SidebarNav, {
  sideBarItemType,
} from "@components/layout/sidebarNav.component";

const items: sideBarItemType[] = [
  {
    name: "Dashboard",
    href: "",
    icon: "dashboard",
  },
  {
    name: "Products",
    href: "products",
    icon: "products",
  },
  {
    name: "Categories",
    href: "categories",
    icon: "store",
  },
  {
    name: "Users",
    href: "users",
    icon: "users",
  },
  {
    name: "Orders",
    href: "orders",
    icon: "dollor",
  },
  {
    name: "Settings",
    href: "settings",
    icon: "settings",
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 h-full">
        <SidebarNav {...{ items }} />
        <div className="container flex-1 py-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
