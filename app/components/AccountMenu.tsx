'use client';
import {signOut} from 'next-auth/react';
interface AccountProps{
    visible?:boolean;
}
const AccountMenu: React.FC<AccountProps>= ({visible}) =>
{ if(!visible) return null;
    return(
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800">
            <div className="flex flex-col">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                <img className="w-8 rounded-md" src="/images/ProfilesImage.avif" />
                <p className="text-white text-sm group-hover/item:underline">UserName</p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={()=>signOut()}className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of NetFlix
                </div>
            </div>
        </div>
    )
}
export default AccountMenu;