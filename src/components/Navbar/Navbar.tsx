import clsx from "clsx";
import { useAppSelector } from "../../hooks/redux_hooks";
import { configurationsSelector } from "../../store/features/configurationsSlice";

export default function Navbar() {
  const { configuration } = useAppSelector(configurationsSelector);

  return (
    <div className="">
      <div className=" h-full w-full">
        <nav
          className={clsx(
            "shadow",
            configuration
              ? `text-white bg-[${configuration.mainColor}]`
              : "bg-white"
          )}
        >
          <div className=" mx-auto container px-6 py-2 xl:py-0">
            <div className=" flex items-center justify-between">
              <div className=" w-full h-full flex sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="py-2 flex items-center min-w-[200px] justify-center h-[56px]">
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
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
