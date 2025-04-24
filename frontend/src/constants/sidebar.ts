import React from "react";
import { CloudHail, Activity } from "lucide-react";
import { CycloneIcon, FloodIcon, LandslideIcon } from "../components/icons/Sidebar-Icons";
type SidebarItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
  {
    href: "/dashboard/rainfall",
    label: "Rainfall",
    icon: CloudHail,
  },
  {
    href: "/dashboard/earthquakes",
    label: "Earthquake",
    icon: Activity,
  },
  {
    href: "/dashboard/floods",
    label: "Flood",
    icon: FloodIcon,
  },
  {
    href: "/dashboard/landslides",
    label: "Landslide",
    icon: LandslideIcon,
  },
  {
    href: "/dashboard/cyclones",
    label: "Cyclone",
    icon: CycloneIcon,
  },
];
export default sidebarItems;
