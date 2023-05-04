import { FaStar } from "react-icons/fa";

export const getStar = (num) => {
  const starDisplay = (index) => {
    return index < num ? (
      <FaStar size={20} color={starColor()} key={index} />
    ) : (
      <FaStar size={20} color="silver" key={index} />
    );
  };

  const starColor = () => {
    switch (num) {
      case 1:
        return "red";

      case 2:
      case 3:
        return "#d4af37";

      case 4:
      case 5:
        return "green";

      default:
        return "black";
    }
  };

  return [...Array(5)].map((_, index) => starDisplay(index));
};
