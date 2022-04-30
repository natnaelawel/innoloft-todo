import clsx from "clsx";
import { useEffect, useState } from "react";
import { AppConfiguration } from "../../helpers/types";
import { useAppSelector } from "../../hooks/redux_hooks";
import { configurationsSelector } from "../../store/features/configurationsSlice";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  configuration: AppConfiguration;
};
export default function Navbar(props: Props) {
  const { configuration } = useAppSelector(configurationsSelector);

  return (
    <div className={`bg-[${configuration.mainColor}]`}>
      {/* Navigation starts */}
      <nav
        className={clsx(
          "h-16 flex items-center lg:items-stretch justify-end lg:justify-between relative z-10 shadow"
        )}
      >
        <div className="lg:flex w-full pr-6">
          <div className="h-full w-1/2 lg:flex items-center p-3 ">
            <div className="h-full w-full flex items-center px-8">
              <img
                className="w-full h-full object-contain"
                src={
                  configuration
                    ? configuration.logo
                    : "https://img.innoloft.com/logo.svg"
                }
                alt="innoloft"
              />
            </div>
          </div>
          <div className="w-1/2 hidden lg:flex"></div>
        </div>
        <div
          className="text-gray-600 mr-8 visible lg:hidden relative"
          onClick={() => props.setShow(!props.show)}
        >
          {props.show ? (
            " "
          ) : (
            //   menu button
            <svg
              aria-label="Main Menu"
              aria-haspopup="true"
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu cursor-pointer"
              width={30}
              height={30}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={8} x2={20} y2={8} />
              <line x1={4} y1={16} x2={20} y2={16} />
            </svg>
          )}
        </div>
      </nav>
      {/* Navigation ends */}
    </div>
  );
}
