import React from "react";
import clsx from "clsx";
import { Link, Location, useLocation, useParams } from "react-router-dom";
import { WithChildren } from "../../helpers/types";
import Navbar from "../Navbar/Navbar";

interface LayoutProps extends WithChildren {}

export default function BaseLayout({ children }: LayoutProps) {
  const location: Location = useLocation();
  const sidebarHandler = () => {};
  const dropdownHandler = () => {};

  const paths = [
    {
      path: "/",
    },
  ];

  return (
    <div className="flex flex-col flex-no-wrap w-full">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <div className="hidden xl:flex min-h-full w-1/6 relative">
          <div className="w-full absolute sm:relative bg-indigo-50 shadow md:h-full flex-col justify-between hidden md:flex">
            <div>
              <ul className="my-5">
                <Link to={`/products`}>
                  <li
                    className={clsx(
                      "flex w-full justify-between text-gray-600 hover:text-gray-100  hover:bg-indigo-400  cursor-pointer items-center px-8 py-3",

                      location.pathname.includes("/dashboard") &&
                        "text-white bg-indigo-300"
                    )}
                  >
                    <div className="flex items-center">
                      <span className="text-sm  ml-2">Products</span>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-full container mx-auto p-5 w-full lg:w-5/6  overflow-auto max-h-[calc(100vh-64px)]">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
