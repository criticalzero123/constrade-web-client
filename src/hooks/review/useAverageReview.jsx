import { useEffect, useState } from "react";
import { getMyAverageRate } from "../../redux/action/reviewAction";

const useAverageReview = (userId) => {
  const [average, setAverage] = useState();
  useEffect(() => {
    if (userId === undefined) return;
    const fetch = async () => {
      const result = await getMyAverageRate(userId);

      setAverage(result);
    };

    fetch();
  }, [userId]);

  return [average];
};

export default useAverageReview;
