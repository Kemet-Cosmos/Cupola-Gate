import React from "react";

const ProfileLoading = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full py-20">
      <div className="w-full lg:w-2/4 h-screen bg-neutral-800 animate-pulse rounded-3xl"></div>
      <div className="w-full lg:w-2/4 h-screen bg-neutral-800 animate-pulse rounded-3xl"></div>
    </section>
  );
};

export default ProfileLoading;
