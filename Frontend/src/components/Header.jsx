import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Icons/logo.png";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import projectName from "@/assets/Images/projectNameLogo.png";

function Header() {

  return (
    <>
      <header className="flex items-center justify-between mt-1 mx-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="w-fit">
            <Image src={logo} alt="Logo" height={50} width={50} />
          </span>
          <Image src={projectName} alt="Project Name" height={150} width={180}/>
        </Link>

        <div>
          <UserButton afterSignOutUrl="/" showName/>

          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>

        </div>
      </header>
      <hr class="h-0.5 my-2 bg-gray-300 border-0" />
    </>
  );
}

export default Header;
