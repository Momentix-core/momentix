import React from "react";
import Cards from "./Cards";
const styles = {
  container: `h-full w-full flex flex-col mt-[50px] pr-[50px]`,
};

const Main = () => {
  return (
    <div className={styles.container}>
      <h2>Events</h2>
      <Cards />
    </div>
  );
};

export default Main;
