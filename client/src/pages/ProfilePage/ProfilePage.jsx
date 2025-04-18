import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);

    if (pics && (pics.type === "image/jpeg" || pics.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPic(reader.result); // Local image preview
      };
      reader.readAsDataURL(pics);

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/donhwxksm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPicMessage("Passwords do not match");
      return;
    }

    dispatch(
      updateProfile({
        name,
        email,
        password: password ? password : undefined,
        pic,
      })
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0a091b] relative z-0 pt-5">
      <div
        className="
          absolute
          left-0 bottom-10
          w-[10%] h-72
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
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
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <div className="relative m-auto w-full max-w-4xl mt-5 flex flex-col-reverse md:flex-row shadow-md rounded-lg p-6 text-gray-300">
        <form
          className="flex-1 flex flex-col space-y-4"
          onSubmit={submitHandler}
        >
          {loading && <p className="text-blue-500">Loading...</p>}
          {success && <p className="text-green-500">Updated Successfully</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-gray-300">Name</label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-300">Email Address</label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-300">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {picMessage && <p className="text-red-500">{picMessage}</p>}
          <div>
            <label className="block text-gray-300">
              Change Profile Picture
            </label>
            <Input
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
              className="w-full"
            />
          </div>
          <Button type="submit" className="bg-buttonColor border-[1px] border-gray-400">
            Update
          </Button>
        </form>
        <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
          <img
            src={pic}
            alt={name}
            className="w-60 h-60 rounded-full border-2 border-gray-300 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
