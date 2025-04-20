import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "@/actions/userActions";
import { LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ResponsiveNavbar = ({ showNavBar, setShowNavBar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
  return (
    <div className="w-full absolute h-screen z-50 bg-darkBG flex flex-col p-2 md:hidden">
      <div>
        <XIcon
          className="top-4 ml-auto right-4 text-white cursor-pointer"
          onClick={() => setShowNavBar(false)}
        />
      </div>
      <div className="flex flex-col h-full space-y-6 py-2">
        <div className="flex flex-col items-start space-y-4 border-b-[1px] border-gray-200 p-2">
          <Link
            to="/mynotes"
            className="text-white text-lg font-bold hover:underline"
            onClick={() => setShowNavBar(false)}
          >
            My Notes
          </Link>
        </div>
        <div className="flex flex-col items-start space-y-4 border-b-[1px] border-gray-200n p-2">
          <Link
            to="/profile"
            className="text-white text-lg font-bold hover:underline"
            onClick={() => setShowNavBar(false)}
          >
            My Profile
          </Link>
        </div>
        <div className="flex flex-col items-start space-y-4 border-b-[1px] border-gray-200n p-2">
          <button
            className="text-white text-lg font-bold hover:underline"
            onClick={() => {
              
                dispatch(logout());
                setShowNavBar(false);
                navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveNavbar;
