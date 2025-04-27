"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggingPage = pathname === "/login";
  const { user ,setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null)
    router.push('/login');
  }

  console.log(isLoggingPage)

  const avatar = (<div className='group relative'>
                    <Image src={'/user.png'} alt="profile" width={30} height={30} className='w-7 cursor-pointer' />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36  bg-gray-900 text-white-500 rounded border'>
                            <p className='cursor-pointer hover:text-gray-300 hover:bg-gray-800 py-3 px-5 rounded' onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
  </div>)
  
  return (
    <div className="border-b-[0.5px] border-gray-600 h-[15%] w-full">
      <nav className="max-w-[1360px] flex items-center justify-between py-5 px-5 mx-auto">
        <h1 className="text-2xl">QuoteVault</h1>
        <h2> {isLoggingPage && !user ? " " :<div className="flex items-center gap-2">
    <p >Welcome, {user}</p>
    {avatar}
  </div>   }</h2>
      </nav>
    </div>
  );
};

export default Navbar;
