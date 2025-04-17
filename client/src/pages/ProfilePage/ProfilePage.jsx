import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";

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
    <div className="m-auto w-full max-w-4xl mt-8 flex flex-col-reverse md:flex-row bg-white shadow-md rounded-lg p-6">
      <form className="flex-1 flex flex-col space-y-4" onSubmit={submitHandler}>
        {loading && <p className="text-blue-500">Loading...</p>}
        {success && <p className="text-green-500">Updated Successfully</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {picMessage && <p className="text-red-500">{picMessage}</p>}
        <div>
          <label className="block text-gray-700">Change Profile Picture</label>
          <input
            type="file"
            onChange={(e) => postDetails(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>
      <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
        <img
          src={pic}
          alt={name}
          className="w-40 h-40 rounded-full border-2 border-gray-300 object-cover"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
