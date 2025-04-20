import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo, navigate]);

  return (
    <div
      className="  flex flex-col items-center justify-center relative min-h-screen z-0
    bg-[#0a091b]
    [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
    [background-size:32px_32px]"
    >
      <div
        className="
          absolute
          left-0 bottom-10
          w-[10%] h-72
          bg-[radial-gradient(ellipse_at_center,_rgba(92,54,103,0.5),_transparent_70%)]
          filter blur-2xl
          pointer-events-none
          -z-30 
  "
      ></div>
      <div
        className="
          absolute
          top-[30%]
          w-[70%] h-72
          bg-[radial-gradient(ellipse_at_center,_rgba(92,54,103,0.5),_transparent_70%)]
          filter blur-2xl
          pointer-events-none
          -z-30 
  "
      ></div>
      <div className="text-center z-10">
        <h1 className="md:text-7xl font-bold text-white mb-4">
          Welcome to Note Zipper
        </h1>
        <p className="text-lg mb-8 text-white">
          One Safe place for all your notes.
        </p>
      </div>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-[#5c3d8f] text-white py-2 px-6 rounded-lg hover:bg-[#9d82c9]">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="border border-[#5c3d8f] text-white py-2 px-6 rounded-lg hover:bg-[#9d82c9]">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
