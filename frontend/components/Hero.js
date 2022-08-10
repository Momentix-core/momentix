import React from "react";

const Hero = () => {
  return (
    <div className="bg-orange-500">
      <div className=" container mx-auto flex max-w-7xl flex-col py-24 px-3 sm:py-60">
        <div className="mb-5 flex-col justify-center sm:mb-10  sm:w-2/3 lg:flex">
          <div className="space-between">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl">
              Find Events That Give you Memorabilia
            </h1>
            <p className="text-md mt-2 font-normal text-white  sm:text-2xl lg:w-10/12">
              Tickets that turn into precious souvenirs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
