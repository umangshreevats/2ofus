"user client";
import Image from "next/image";

const UserProfile = ({ profileInfo }: { profileInfo: any }) => {


    return <div className="w-full rounded-full flex gap-5 items-center p-2 shadow-[0_0_6px_var(--accent)]">
        <div className="w-10 h-10 rounded-full">
            {(profileInfo.profile_image && profileInfo.profile_image.length > 0 ) ?
                <Image src={profileInfo.profile_image} alt={`profile-image-@${profileInfo.username}`}
                    width={150} height={150} className="object-cover rounded-full" /> : 
                <div className="w-full h-full flex 
                justify-center rounded-full items-center bg-accent font-bold text-white">
                    {profileInfo.username[0] ?? profileInfo.firstname[0] ?? profileInfo.lastname[0]}
                </div>}
        </div>

        <div className="flex flex-col gap-1">
            <p className="w-full font-bold">{profileInfo.firstname} {profileInfo.lastname}</p>
            <p className="w-full font-light text-secondary-text">@{profileInfo.username}</p>
        </div>

        <div>{profileInfo.gender}</div>
    </div>
}

export default UserProfile;