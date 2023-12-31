"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
  //   const { user, isLoggedIn, signOut } = useAuth();

  const router = useRouter();

  //   const items = useMemo(() => {
  //     return [
  //       {
  //         name: "Account",
  //         key: "account",
  //         icon: <UserIcon size={18} />,
  //         action: () => {
  //           return router.push("/settings");
  //         },
  //       },

  //       {
  //         name: "Settings",
  //         key: "settings",
  //         icon: <SettingsIcon size={18} />,
  //         action: () => {
  //           return router.push("/settings");
  //         },
  //       },
  //     ];
  //   }, [router]);
  return (
    <div className="flex z-20 bg-orange-400 sticky top-0 left-0 right-0 items-center shadow justify-between    w-full p-4 px-[220px]  ">
      {/* <div
                onClick={() => {
                    router.push("/");
                }}
                className="flex items-center gap-4 cursor-pointer"
            >
                <TypoGraphy variant="h3">Daju Bhai Mart</TypoGraphy>
            </div> */}
      <div className="flex items-center gap-4">
        {/* {isLoggedIn && (
          <DropdownMenu
            align="end"
            label={
              <div className="flex flex-col ">
                <div className="text-sm font-medium capitalize">
                  {user?.name}
                </div>
                <div className="text-xs">{user?.email}</div>
              </div>
            }
            items={items}
            trigger={<UserIcon />}
            footer={
              <div
                onClick={() => {
                  //   signOut();
                  router.push("/login");
                }}
                className="flex items-center gap-4 p-2 px-6 cursor-pointer hover:bg-base-200"
              >
                <LogoutIcon size={18} />
                <div>Logout</div>
              </div>
            }
          />
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
