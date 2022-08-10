const styles = {
  container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
  title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
  cards: `flex items-center  flex-wrap gap-[80px]`,
};

const Cards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        {/* each event in the database will be mapped and displayed in a Card.js component */}
        <p>card</p>
        <p>card</p>
        <p>card</p>
      </div>
    </div>
  );
};

export default Cards;
