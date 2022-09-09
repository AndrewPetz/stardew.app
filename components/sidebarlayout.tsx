import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";

import { HiSparkles } from "react-icons/hi";
import { IoIosArchive } from "react-icons/io";
import {
  FaUserCircle,
  FaFish,
  FaHammer,
  FaHouseUser,
  FaHeart,
} from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { MdLocalShipping, MdMuseum } from "react-icons/md";

import LoginModal from "./modals/login";
import DesktopNav from "./desktopnav";
import MobileNav from "./mobilenav";

const navigation = [
  { name: "Home", href: "/", icon: FaHouseUser },
  { name: "Farmer", href: "/farmer", icon: FaUserCircle },
  { name: "Fishing", href: "/fishing", icon: FaFish },
  { name: "Perfection", href: "/construction", icon: HiSparkles },
  { name: "Cooking", href: "/cooking", icon: GiCookingPot },
  { name: "Crafting", href: "/crafting", icon: FaHammer },
  { name: "Shipping", href: "/shipping", icon: MdLocalShipping },
  { name: "Family & Social", href: "/social", icon: FaHeart },
  { name: "Museum & Artifacts", href: "/artifacts", icon: MdMuseum },
  { name: "Bundles", href: "/bundles", icon: IoIosArchive },
];
export type NavItem = typeof navigation[0];

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarLayout = ({
  children,
  activeTab,
  sidebarOpen,
  setSidebarOpen,
}: LayoutProps) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const [user, setUser] = useState<{
    discord_name: string;
    discord_id: string;
    discord_avatar: string;
  } | null>(null);
  useEffect(() => {
    try {
      const cookie = getCookie("discord_user");
      if (!cookie) setUser(null);
      setUser(JSON.parse(cookie as string));
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <>
      <MobileNav
        activeTab={activeTab}
        navigation={navigation}
        setShowLoginModal={setShowLoginModal}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        user={user}
      />

      <DesktopNav
        activeTab={activeTab}
        navigation={navigation}
        setShowLoginModal={setShowLoginModal}
        setSidebarOpen={setSidebarOpen}
        user={user}
      >
        <AnimatePresence>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-6">{children}</div>
          </motion.div>
        </AnimatePresence>
      </DesktopNav>

      <LoginModal isOpen={showLoginModal} setOpen={setShowLoginModal} />
    </>
  );
};

export default SidebarLayout;
