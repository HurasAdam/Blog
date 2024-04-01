import { Link } from "react-router-dom";
import { images } from "../../../constants";
import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import NavItemCollapse from "./NavItemCollapse";
import NavItem from "./NavItem";
import { useWindowSize } from "@uidotdev/usehooks";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },

  {
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComments className="text-xl" />,
    name: "comments",
    type: "link",
  },

  {
    title: "Posts",
    content: [
      { title: "New", link: "/admin/posts/new" },
      { title: "Manage", link: "/admin/posts/manage" },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
  {
    title: "Tags",
    content: [
      { title: "New", link: "/admin/tags/new" },
      { title: "Manage", link: "/admin/tags/manage" },
    ],
    icon: <FaHashtag className="text-xl" />,
    name: "tags",
    type: "collapse",
  },
];
const Header: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const toggleMenuHanlder = (): void => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* Logo */}
      <Link to="/">
        <img className="w-16 lg:hidden" src={images.Logo} alt="logo" />
      </Link>
      {/* Menu burger  */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6 " onClick={toggleMenuHanlder} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHanlder} />
        )}
      </div>
      {/* sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHanlder}
          />

          {/* sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-55 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img className="w-16" src={images.Logo} alt="logo" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">Menu</h4>
            {/* menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) => {
                if (item.type === "link") {
                  return (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      title={item?.title}
                      link={item?.link}
                      name={item?.name}
                      activeNavName={activeNavName}
                      setActiveNavName={setActiveNavName}
                    />
                  );
                } else {
                  return (
                    <NavItemCollapse
                      key={item.title}
                      icon={item.icon}
                      title={item?.title}
                      content={item?.content}
                      name={item?.name}
                      activeNavName={activeNavName}
                      setActiveNavName={setActiveNavName}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
