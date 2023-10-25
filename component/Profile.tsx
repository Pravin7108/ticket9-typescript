"use client"
import React, { useState, useEffect, useContext } from "react";
import Dropdown from "./Dropdown";
import Icon from "./Icon";
import Swal from "sweetalert";
// import { Menu } from "@headlessui/react";
// import { useDispatch } from "react-redux";
// import { handleLogout } from "../../../../components/partials/auth/store";
import { useRouter } from "next/navigation";
// import { UserContext, Accesstokens } from "../../../../app/layout";
// import { handleDarkMode } from "../../../../store/layoutReducer";
// import firebase from "../../../../firebase";
import { getAuth, signOut } from 'firebase/auth';
import jwtDecode from "jwt-decode";
import { Accesstokens } from "@/app/layout";
import { Menu } from "@headlessui/react";
// import { Role } from "../../../../app/layout";

type ProfileMenuOption = {
  label: string;
  icon: string;
  action: () => void;
};

type ProfileProps = {};

const ProfileLabel: React.FC = () => {
  const accessToken = useContext(Accesstokens);
  // const role = useContext(Role);
  const [decodeddata, setDecodeddata] = useState<any>("");

  const handleDecodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      setDecodeddata(decoded);
    } catch (error) {
      // console.error(error.message);
    }
  };

  useEffect(() => {
    if (accessToken?.trim() !== "") {
      handleDecodeToken(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            draggable={false}
            src={decodeddata.picture}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {decodeddata.name}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile: React.FC<ProfileProps> = () => {
  // const change = useContext(UserContext);
  // const dispatch = useDispatch();
  const router = useRouter();
  // const auth = getAuth(firebase);
  // const role = useContext(Role);

  const ProfileMenu: ProfileMenuOption[] = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",
      action: () => {
        router.push("/profile");
      },
    },
    {
      label: "Settings",
      icon: "heroicons-outline:cog-6-tooth",
      action: () => {
        router.push("/settings");
      },
    },
    {
      label: "View Events",
      icon: "heroicons-outline:calendar-days",
      action: () => {
        router.push("https://ticket9.vercel.app/");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:logout",
      action: () => {
        Swal({
          title: "Are you sure?",
          // buttons: true,
          // dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            Swal("Logout Successfully", {
              icon: "success",
            });
            // signOut(auth);
            sessionStorage.clear();
            const cookies = `Attract="";expires=${new Date().toUTCString()};path="/"`;
            const cookies2 = `Retract="";expires=${new Date().toUTCString()};path="/"`;
            const pass = (document.cookie = cookies, document.cookie = cookies2);
            // dispatch(handleLogout(false, pass, change));
            // dispatch(handleDarkMode(false));
          }
        });
      },
    },
  ];

  const organizerProfileMenu: ProfileMenuOption[] = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",
      action: () => {
        router.push("/profile");
      },
    },
    {
      label: "View Events",
      icon: "heroicons-outline:calendar-days",
      action: () => {
        router.push("https://ticket9.vercel.app/");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:logout",
      action: () => {
        Swal({
          title: "Are you sure?",
          // buttons: true,
          // dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            Swal("Logout Successfully", {
              icon: "success",
            });
            // signOut(auth);
            sessionStorage.clear();
            const cookies = `Attract="";expires=${new Date().toUTCString()};path="/"`;
            const cookies2 = `Retract="";expires=${new Date().toUTCString()};path="/"`;
            const pass = (document.cookie = cookies, document.cookie = cookies2);
            // dispatch(handleLogout(false, pass, change));
            // dispatch(handleDarkMode(false));
          }
        });
      },
    },
  ];

  // if (role === "attendee") {
    return (
      <Dropdown classMenuItems="w-[180px] top-[58px]">
        {ProfileMenu.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <div
                onClick={() => item.action()}
                className={`${active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
                } block    `}
              >
                <div className={`block cursor-pointer px-4 py-2`}>
                  <div className="flex items-center">
                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                      <Icon icon={item.icon} />
                    </span>
                    <span className="block text-sm">{item.label}</span>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>
        ))}
      </Dropdown>
    );
  // } else {
    // return (
    //   <Dropdown  classMenuItems="w-[180px] top-[58px]">
    //     {organizerProfileMenu.map((item, index) => (
    //       <Menu.Item key={index}>
    //         {({ active }) => (
    //           <div
    //             onClick={() => item.action()}
    //             className={`${active
    //               ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
    //               : "text-slate-600 dark:text-slate-300"
    //             } block   `}
    //           >
    //             <div className={`block cursor-pointer px-4 py-2`}>
    //               <div className="flex items-center">
    //                 <span className="block text-xl ltr:mr-3 rtl:ml-3">
    //                   <Icon icon={item.icon} />
    //                 </span>
    //                 <span className="block text-sm">{item.label}</span>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </Menu.Item>
    //     ))}
    //   </Dropdown>
    // );
  // }
};

export default Profile;
