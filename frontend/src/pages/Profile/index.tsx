import { useSelector } from "react-redux";
import PageHeader from "../../components/Common/PageHeader";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { updateUserDetails } from "../../services/userServices";

const Profile = () => {

    const user = useSelector((state: RootState) => state.user);
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        bio: ""
    });

    useEffect(() => {
        const { firstName, lastName, username, email, bio = "" } = user;
        setUserDetails({
            firstName,
            lastName,
            username,
            email,
            bio
        })
    }, [user]);

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    const handleUpdateUserDetails = () => {
        const { username, email, ...payload } = userDetails;
        updateUserDetails(payload);
    };

    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header={`${userDetails.firstName} ${userDetails.lastName}`} />

            <div className="w-full p-6">
                <div className="flex rounded-2xl items-center border p-6 m-6 bg-white">
                    <div className="min-w-20 min-h-20 text-purple-700 flex items-center justify-center rounded-full overflow-hidden border-2 border-black border-dashed bg-sky-300 font-bold text-4xl">
                        {userDetails.firstName[0] || userDetails.lastName[0]}
                    </div>
                    <div className="ml-6 space-y-1">
                        <div className="italic text-sm">
                            {userDetails.username}
                        </div>
                        <div className="font-medium text-xl">
                            {userDetails.firstName} {userDetails.lastName}
                        </div>
                        <div className="text-blue-600">
                            {userDetails.email}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl items-center border p-6 m-6 space-y-6 bg-white">
                    <div className="text-xl font-bold mb-6">Edit Profile</div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="firstName" className="text-gray-500 font-medium">First Name</label>
                        <input type="text" id="firstName" name="firstName" className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={userDetails.firstName} onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lastName" className="text-gray-500 font-medium">Last Name</label>
                        <input type="text" id="lastName" name="lastName" className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={userDetails.lastName} onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className="text-gray-500 font-medium">Username <span className="text-xs font-normal">(not editable)</span></label>
                        <input type="text" id="username" name="username" readOnly disabled className="border border-black focus:border-black rounded-lg h-6 py-6 px-4 cursor-not-allowed" value={userDetails.username} onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-gray-500 font-medium">Email <span className="text-xs font-normal">(not editable)</span></label>
                        <input type="text" id="email" name="email" readOnly disabled className="border border-black focus:border-black rounded-lg h-6 py-6 px-4 cursor-not-allowed" value={userDetails.email} onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="bio" className="text-gray-500 font-medium">Bio</label>
                        <input type="text" id="bio" name="bio" className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={userDetails.bio} onChange={handleOnChange} />
                    </div>

                    <button
                        className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                        type="button"
                        onClick={handleUpdateUserDetails}
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
