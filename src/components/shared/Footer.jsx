import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div  >
      <footer className="w-full bg-blue-100 border-t-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="py-14 grid grid-cols-12 gap-x-5 gap-y-8">
            <div className="col-span-full xl:col-span-3 relative bg-[#193281] rounded-2xl gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative w-8 h-7 ">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#154799] opacity-80 z-30"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-red-500 opacity-80 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-500 opacity-80 z-10"></div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white  ">
                  JOBNEST
                </span>
              </Link>
              <p className="text-center text-gray-200">
                Trusted in more than 100 countries & 5 million customers. Have
                any query? contact us we are here for you.
              </p>
              <div className="flex space-x-4 sm:justify-center">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md"
                >
                  {/* SVG for social media icon */}
                  <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            }
            alt={` logo`}
            className="w-6 h-6 rounded-lg object-contain "
          />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md"
                >
                  {/* SVG for social media icon */}
                  <img
            src={
              "https://i.pinimg.com/474x/f7/99/20/f79920f4cb34986684e29df42ec0cebe.jpg"
            }
            alt={` logo`}
            className=" rounded-full h-9 w-9 object-fill "
          />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md"
                >
                  {/* SVG for social media icon */}
                  <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
            }
            alt={` logo`}
            className="w-6 h-6 rounded-lg object-contain "
          />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md"
                >
                  {/* SVG for social media icon */}
                  <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
            }
            alt={` logo`}
            className="w-6 h-6 rounded-lg object-contain "
          />
                </a>
              </div>
            </div>

            <div className="block text-center xl:text-left xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5">
              <h4 className="text-lg text-gray-900 font-bold mb-9">
                Get In Touch
              </h4>
              <ul className="text-gray-900 transition-all duration-500 grid gap-6">
                <li>support@pagedone.com</li>
                <li>+91 945 658 3256</li>
                <li>61-A, Elm street, Gujarat, India.</li>
              </ul>
            </div>
            <div className="block xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3">
              <h4 className="text-lg text-gray-900 font-bold mb-9 text-center xl:text-left">
                Quick Links
              </h4>
              <div className="flex gap-6 xl:gap-12 max-xl:justify-center">
                <ul className="text-gray-600 transition-all duration-500 grid gap-6">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                  <li>
                    <a href="#">Price Plan</a>
                  </li>
                  <li>
                    <a href="#">Features</a>
                  </li>
                </ul>
                <ul className="text-gray-600 transition-all duration-500 grid gap-6">
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Products</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="block xl:py-16 col-span-full md:col-span-4 xl:col-span-3">
              <h4 className="text-lg text-gray-900 font-bold mb-9 text-center xl:text-left">
                Get latest job posted updated on email
              </h4>
              <div className="grid gap-7">
                <input
                  type="text"
                  name="email"
                  className="py-2 px-4 border border-gray-300 shadow-sm h-14 text-lg text-gray-800 rounded-full w-full xl:w-64 placeholder:text-gray-400 focus:outline-none"
                  placeholder="Enter email.."
                />
                <button
                  type="submit"
                  className="flex gap-2 justify-center items-center py-3.5 px-7 rounded-full text-white bg-indigo-600 shadow-md w-fit transition-all duration-500 mx-auto xl:mx-0 hover:bg-indigo-700"
                >
                  Subscribe
                  <svg
                    width="17"
                    height="13"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 6.88281L14.8333 6.88281M10.6667 11.8828L15.0774 7.47207C15.3552 7.19429 15.4941 7.0554 15.4941 6.88281C15.4941 6.71022 15.3552 6.57133 15.0774 6.29356L10.6667 1.88281"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Grid */}
        </div>
        <div className="py-4 bg-blue-100">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-800">
              Copyright@2024 All Right Reserved by{" "}
              <a href="https://pagedone.io/">pagedone</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
