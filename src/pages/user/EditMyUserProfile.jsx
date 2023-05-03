import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "flowbite-react";
import { getUserInfo, updatePersonInfo } from "../../redux/action/userActions";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
const EditMyUserProfile = () => {
  const { user, person } = useUserInfo();
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);
  const [birthdate, setBirthdate] = useState(
    new Date(person.birthdate) ?? new Date()
  );
  const [gender, setGender] = useState(person.gender);
  const [image, setImage] = useState(user.imageUrl ?? "male");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    const newUser = {
      ...user,
      imageUrl: image,
    };
    const newPerson = {
      ...person,
      firstName: firstName === "" ? person.firstName : firstName,
      lastName: lastName === "" ? person.lastName : lastName,
      birthdate: birthdate !== null ? new Date(birthdate) : null,
      gender: gender,
    };

    const res = await updatePersonInfo({ user: newUser, person: newPerson });

    if (res) {
      dispatch(getUserInfo(res));

      Swal.fire({
        title: "Update Successfully",
        text: "Your profile is now updated!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/users/my`;
        }
      });
    } else {
      alert("Something went wrong in updating.");
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-1/4 h-3/4 shadow-2xl p-4 rounded">
        <p className="text-lg text-center font-semibold mb-5">Edit Profile</p>
        {/* <div className="flex justify-center mb-7">
          <img src={image} alt="profile" className="w-24 h-24 rounded-full" />
        </div> */}
        <label>First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={firstName}
          className="ml-2 rounded border-gray-300"
        />
        <br />
        <label>Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={lastName}
          className="ml-2 rounded border-gray-300 mt-4"
        />
        <br />
        <label>Gender: </label>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="ml-2 rounded mt-4 border-gray-300"
        >
          <option value="male"> Male</option>
          <option value="female"> Female</option>
        </select>
        <br />
        <br />
        <label>Birthdate: </label>
        <ReactDatePicker
          selected={birthdate}
          onChange={(date) => setBirthdate(date)}
          className="border rounded border-gray-300"
        />
        <button
          className="bg-[#CC481F] w-full text-white py-3 rounded mt-10"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Done"}
        </button>
      </div>
    </div>
  );
};

export default EditMyUserProfile;
