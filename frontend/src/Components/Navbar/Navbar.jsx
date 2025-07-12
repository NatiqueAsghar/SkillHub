import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

const UserProfileDropdown = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    try {
      await axios.get("/auth/logout");
      window.location.href = "http://localhost:5173/login";
    } catch (error) {
      console.error(error.response?.data?.message || error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer "
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.picture}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
        <FaChevronDown className="w-4 h-4 text-txt hover:text-tl" />
      </div>

      {open && (
        <ul className="absolute right-0 mt-2 bg-bgd border border-line rounded shadow-md z-50 w-40 ">
          <li
            className="px-4 py-2 hover:bg-tl cursor-pointer"
            onClick={() => {
              navigate(`/profile/${user.username}`);
              setOpen(false);
            }}
          >
            Profile
          </li>
          <li
            className="px-4 py-2 hover:bg-rd cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

const Header = () => {
  const [navUser, setNavUser] = useState(null);
  const { user } = useUser();
  const [discover, setDiscover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setNavUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  useEffect(() => {
    const temp = window.location.href.split("/");
    const url = temp.pop();
    setDiscover(url.startsWith("discover"));
  }, [window.location.href]);

  return (
    <nav className="bg-bgd border-b border-line z-[998] sticky top-0">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold font-josefin text-tl"
        >
          SKILL HUB
        </Link>
        <button
          className="md:hidden text-txt"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div
          className={`hidden md:flex md:items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-base font-semibold font-montserrat text-txt">
            <li>
              <Link to="/" className="hover:text-tl">
                Home
              </Link>
            </li>
            {navUser !== null ? (
              <>
                <li className="relative group">
                  {/* Discover link with dropdown */}
                  <Link
                    to="/discover"
                    className="flex items-center hover:text-tl"
                  >
                    Discover{" "}
                    <FaChevronDown className="w-4 h-4 ml-1 hidden md:block" />
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 bg-bgd rounded-md shadow-lg  z-10 hidden md:group-hover:block border border-line">
                    <a
                      href="#for-you"
                      className="block px-4 py-2 text-sm text-txt hover:bg-tl"
                    >
                      For You
                    </a>
                    <a
                      href="#popular"
                      className="block px-4 py-2 text-sm text-txt hover:bg-tl"
                    >
                      Popular
                    </a>
                    <a
                      href="#web-development"
                      className="block px-4 py-2 text-sm text-txt hover:bg-tl"
                    >
                      Web Development
                    </a>
                    <a
                      href="#machine-learning"
                      className="block px-4 py-2 text-sm text-txt hover:bg-tl"
                    >
                      Machine Learning
                    </a>
                    <a
                      href="#others"
                      className="block px-4 py-2 text-sm text-txt hover:bg-tl"
                    >
                      Others
                    </a>
                  </div>
                </li>

                <li>
                  <Link to="/chats" className="hover:text-tl">
                    Your Chats
                  </Link>
                </li>

                {/* Mobile-only links (you can keep these if you want them visible only on mobile) */}
                {/* {discover && (
                  <>
                    <li className="md:hidden">
                      <a href="#for-you" className="text-red-500 text-lg">
                        For You
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a href="#popular" className="text-teal-400 text-lg">
                        Popular
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a href="#web-development" className="text-teal-900">
                        Web Dev
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a href="#machine-learning" className="text-teal-900">
                        Machine Learning
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a href="#others" className="text-teal-900">
                        Others
                      </a>
                    </li>
                  </>
                )} */}

                <li>
                  <UserProfileDropdown />
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-tl">
                  <Link to="/about_us">About</Link>
                </li>
                <li className="hover:text-tl">
                  <Link to="/login">Login/Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {isOpen && (
          <div className="md:hidden bg-bgd border border-line w-full px-4 py-4 shadow-md mt-[64px] fixed top-0 left-0 z-40">
            <ul className="flex flex-col space-y-4 text-base font-semibold font-montserrat text-txt">
              <li>
                <Link to="/" className="hover:text-tl">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-tl">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/chats" className="hover:text-tl">
                  Your Chats
                </Link>
              </li>
              <li className="absolute right-0">
                <UserProfileDropdown />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
