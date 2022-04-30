import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="grid justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-y-5">
        <h1 className="text-8xl text-center">404</h1>
        <h1 className="text-5xl text-center">Page Not Found</h1>
        <Link to="/">
          <a className="text-2xl text-blue-800" href="#">
            &lt;- Go to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
