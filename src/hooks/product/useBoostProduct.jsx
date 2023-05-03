import { useEffect, useState } from "react";
import {
  addProductBoost,
  cancelProductBoost,
  getProductBoost,
} from "../../redux/action/productActions";
import { useUserInfo } from "../../hooks/useUserInfo";
import Swal from "sweetalert2";
const useBoostProduct = (id) => {
  const { user } = useUserInfo();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const res = await getProductBoost(id);

      setData(res);
    };
    fetch();
  }, [id]);

  const addBoost = async (days) => {
    setLoading(true);
    const res = await addProductBoost(id, days, user.userId);

    if (res) {
      Swal.fire({
        title: "Boosted",
        text: "Your product has been boosted.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/products/details/${id}`;
        }
      });
    } else {
      alert("Not enough balance for boosting.");
      setLoading(false);
    }
  };

  const cancelBoost = async (bid) => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to really cancel your boosting? This is not refundable as for moment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cancelProductBoost(bid);
        if (res) {
          Swal.fire({
            title: "Deleted",
            text: "Your file has been deleted!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/products/details/${id}`;
            }
          });
        } else {
          alert("Error in cancelling the boost.");
          setLoading(false);
        }
      }
    });
  };

  return [data, addBoost, cancelBoost, loading];
};

export default useBoostProduct;
