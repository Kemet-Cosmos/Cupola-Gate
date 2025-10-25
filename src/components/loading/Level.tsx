import React from "react";

const LevelLoading = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-5 py-20">
      <div className="w-3xl h-20 rounded-3xl bg-neutral-800 animate-pulse"></div>
      <div className="w-4xl h-[70vh] rounded-3xl bg-neutral-800 animate-pulse"></div>
    </section>
  );
};

export default LevelLoading;
