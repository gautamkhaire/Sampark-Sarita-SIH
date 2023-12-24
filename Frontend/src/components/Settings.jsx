import Image from "next/image";
import Setting_Image from "../assets/Images/Setting_Image.png";
import { UserProfile } from "@clerk/nextjs";
const Settings = () => {
  return (
    <div className="flex flex-row justify-around items-center">
        <div className="-mt-80">
            <Image
                src={Setting_Image}
                alt="Setting Image"
                width={500}
                height={500}
            />
        </div>
        <UserProfile/>
    </div>
  )
}

export default Settings