import React from "react";
import Cards from "./Cards";
import Hero from "./Hero";
const styles = {
  container: `h-full w-full flex flex-col mt-[50px]`,
};

const Main = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <Cards />
    </div>
  );
};

export default Main;
