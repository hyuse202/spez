import React from "react";
import Link from "next/link";
function Header() {
  return (
    <>
    {/* <div className="w-screen h-screen bg-[#181818] overflow-hidden"> */}
      {/* navbar */}
      <div className='w-screen py-6 px-5 lg:px-64 bg-purple-600 flex justify-between text-neutral-300'>
        <span className='text-2xl font-bold'>
          <Link href="/"> Spez</Link>
        </span>
        
        <ul className='hidden md:flex items-center space-x-5 font-semibold'>
          <li>
          <Link href="/about"> About</Link>
          </li>
          <li>
            <Link href="/contact"> Contact</Link>
          </li>
          <li>
            <Link href="/help"> Help</Link>
          </li>
        </ul>

        {/* hamburger menu */}
        <button className='space-y-1 group md:hidden'>
          <div className='w-6 h-1 bg-white'></div>
          <div className='w-6 h-1 bg-white'></div>
          <div className='w-6 h-1 bg-white'></div>

          {/* menu */}
          <ul className='font-semibold bg-[#252525] w-screen pb-10 absolute -top-full group-focus:top-0 right-0 duration-150 flex flex-col space-y-3 justify-end'>
            <li className='flex justify-center w-full py-4 hover:bg-[#202020]'>
            <Link href="/about"> About</Link>
            </li>
            <li className='flex justify-center w-full py-4 hover:bg-[#202020]'>
            <Link href="/contact"> Contact</Link>
            </li>
            <li className='flex justify-center w-full py-4 hover:bg-[#202020]'>
            <Link href="/help"> Help</Link>
            </li>
          </ul>
        </button>
      </div>
    {/* </div> */}
    </>
  );
}
export default Header;