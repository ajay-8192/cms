import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import React, { useState } from "react";

const ProfileEditModal = ({ handleClose }: { handleClose: () => void }) => {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  };

  const onSave = () => {};

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col w-96">
        <div className="mb-4 flex items-center justify-between">
          <div className="opacity-80">Edit Details</div>
          <span
            className="material-icons cursor-pointer"
            style={{ color: "#1f2d5a" }}
            onClick={handleClose}
          >
            close
          </span>
        </div>
        <div className="border-t pt-4">
          <label className="block opacity-70 text-sm">Name</label>
          <Input
            type="text"
            onChange={handleChange}
            name="name"
            classes="w-2/3 mt-2 border focus:border-primary-blue rounded shadow h-10 px-2"
          />

          <label className="block mt-6 opacity-70 text-sm">Email</label>
          <Input
            type="text"
            onChange={handleChange}
            name="email"
            classes="w-2/3 mt-2 border focus:border-primary-blue rounded shadow h-10 px-2"
          />
        </div>

        <Button
          text="Save Changes"
          onClick={onSave}
          classes="mt-10 rounded-lg"
        />
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
