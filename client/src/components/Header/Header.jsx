import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import ResponsiveNavbar from "../ResponsiveNavbar";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavBar, setShowNavBar] = useState(false);  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  if(showNavBar) {
    return (
      <ResponsiveNavbar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
    );
  }

  return (
    
    <div className="bg-darkBG border-b border-gray-800 shadow-md p-2 w-full">
      <nav className="flex items-center justify-between px-4 py-2 bg-darkBG">
        <div>
          <Link
            to="/"
            className="text-gray-200 text-lg font-bold hover:no-underline"
          >
            Note Zipper
          </Link>
        </div>
        <div className="flex max-md:hidden items-center space-x-4">
          <Button
            variant="outline"
            className="text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-600"
          >
            <Link to="/mynotes" className="text-gray-200 hover:underline">
              My Notes
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-600"
              >
                {userInfo ? userInfo.name : "User"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-darkBG">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="text-gray-200 ">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler} className="text-gray-200  mt-2">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search"
              className="w-64 text-gray-200 placeholder-gray-400"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline"
              className="text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-600"
            >
              Search
            </Button>
          </div>
        </div>
        <Menu className="text-white md:hidden" onClick={()=> setShowNavBar(!showNavBar)}/>
        
      </nav>
    </div>
    
  );
};

export default Header;
