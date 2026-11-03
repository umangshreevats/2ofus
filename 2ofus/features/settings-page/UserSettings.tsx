"use client";
import { useAuth } from "@/app/auth-provider";
import Popups from "@/components/commons/Popups";
import SettingPopup from "@/components/settings/SettingPopup";
import SettingsDisplay from "@/components/settings/SettingsDisplay";
import { Users, Lock, LogOut, User, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { verifyClient } from "@/utils/supabase/verify-client";


const UserSettings = () => {


    const { userData } = useAuth();

    /*
    State managment to show the popups to configure the available settings.*/

    /*Username states*/
    const [changeUsername, setChangeUsername] = useState(false);
    const [username, setUsername] = useState(userData.username);
    const [usernameLoading, setUsernameLoading] = useState(false);

    /*Password states*/
    const [changePassword, setChangePassword] = useState(false);
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);




    /*Whenever the user forgot the password
    the effect would run the fuction to send the otp on the user mail id to
    verify the user to change the password*/
    useEffect(() => {

        const sendPasswordResetOtp = async () => {
            const { error } = await supabase.auth.resetPasswordForEmail(userData.email);

            if (error) {
                toast.error(error.message);
                return false;
            }

            toast.success("OTP sent to your email!");
            return true;
        };


        if (forgotPassword) {
            sendPasswordResetOtp()
        }


    }, [forgotPassword]);

    /*Function to send request to change the username of the user*/
    const changeUsernameFunc = async () => {

        if (!username || username.length === 0) {
            toast.warning("The username filed cannot be empty!");
            return;
        }
        setUsernameLoading(true);

        const { data, error } = await supabase
            .from("users")
            .update({
                username
            })
            .eq("id", userData.id)

        if (error) {
            toast.error("Error updating the username: " + error.message);
            setUsernameLoading(false);
            return;
        }

        setUsernameLoading(false);
        setUsername("");
        setChangeUsername(false);
        toast.success("Username changed successfully");
    }


    /*Function to verify the user otp*/
    const verifyPasswordResetOtp = async () => {

        if (!otp || otp.length === 0) {
            toast.warning("OTP cannot be left empty");
            return;
        }
        // Main function to verify the otp on the user account
        const { error } = await supabase.auth.verifyOtp({
            email: userData.email,
            token: otp,
            type: "recovery",
        });

        if (error) {
            toast.error("Invalid or expired OTP.");
            return false;
        }

        setForgotPassword(false);

        return true;
    };

    /*
    The function would reset password, if the otp has been verified
    or the previous password of the user is correct
    */
    const resetPassword = async () => {
        if (!newPassword) {
            toast.warning("Enter your new password.");
            return;
        }

        if (!otpVerified) {
            if (!prevPassword) {
                toast.warning("Enter your current password.");
                return;
            }

            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError || !user?.email) {
                toast.error("Unable to verify your account.");
                return;
            }

            const { error: verifyError } =
                await verifyClient.auth.signInWithPassword({
                    email: user.email,
                    password: prevPassword,
                });

            if (verifyError) {
                toast.error("Incorrect current password.");
                return;
            }
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Password updated successfully!");

        setPrevPassword("");
        setNewPassword("");
        setOtp("");
        setOtpVerified(false);
        setForgotPassword(false);
        setChangePassword(false);
    };

    /*Display of all the users settings
    including the username changing and the password changing along with logging-out*/
    const userSettings = [
        {
            id: "profile-settings",
            title: "Update Profile",
            paragraph: "Update how you appear to your partner and others.",
            onClick: null,
            link: `/home/profile/@${userData.username}`,
            icon: User,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-username",
            title: "Change Username",
            paragraph: "Update your display username.",
            onClick: () => setChangeUsername(true),
            link: null,
            icon: Users,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "change-password",
            title: "Change Password",
            paragraph: "Update your account password.",
            onClick: () => setChangePassword(true),
            link: null,
            icon: Lock,
            secondaryIcon: ArrowRight,
            danger: false
        },
        {
            id: "loggout",
            title: "Logout",
            paragraph: "Sign out from this website.",
            onClick: () => { },
            link: null,
            icon: LogOut,
            secondaryIcon: ArrowRight,
            danger: true
        },

    ];
    return <>

        {/*Main settings display for the app with all the user settings displayed*/}
        <SettingsDisplay title="User Settings" paragraph="Manage your personal account"
            icon={User} settingsOptions={userSettings} />

        {/*Popup for the username changes and updates*/}
        <Popups className="rounded-2xl" open={changeUsername} setOpen={setChangeUsername}>
            <SettingPopup
                title="Change Username"
                btnOnClick={changeUsernameFunc}
                message="Update or change username"
                btnTitle={usernameLoading ? "Updating" : `Update`}
                btnDisabled={username.length === 0 || usernameLoading}
                setOpen={setChangeUsername}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new Username"
                    className="w-full outline-none p-2 rounded-full border-2 border-solid border-primary-text" />
            </SettingPopup>
        </Popups>


        {/*Popup for password changing and management*/}
        <Popups open={changePassword} setOpen={setChangePassword} className="rounded-2xl">
            <SettingPopup
                title="Change Password"
                message="Update your password to a new strong password"
                btnTitle={passwordLoading ? "Updating..." : forgotPassword ? "Verify OTP" : "Update"}
                btnOnClick={forgotPassword ? verifyPasswordResetOtp : resetPassword}
                btnDisabled={passwordLoading || (forgotPassword ? otp.length === 0 : (newPassword.length === 0 && prevPassword.length === 0))}
                setOpen={setChangePassword}>

                <div className="flex flex-col gap-5">
                    {!forgotPassword ? <>
                        {!otpVerified && <input
                            type="password"
                            value={prevPassword}
                            onChange={(e) => setPrevPassword(e.target.value)}
                            placeholder="Enter Previous Password"
                            className="w-full outline-none p-2 rounded-full border-2 border-solid border-primary-text"
                        />}

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter New Password"
                            className="w-full outline-none p-2 rounded-full border-2 border-solid border-primary-text"
                        />

                        <button type="button"
                            onClick={() => setForgotPassword(true)}
                            className="font-bold text-secondary-text cursor-pointer">
                            Forgot Password?
                        </button>
                    </> :
                        <>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full outline-none p-2 rounded-full border-2 border-solid border-primary-text"
                            />
                        </>}
                </div>

            </SettingPopup>
        </Popups>
    </>
}


export default UserSettings;