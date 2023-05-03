import { useEffect, useState } from "react";
import {
  deleteProductById,
  getProductByUser,
} from "../../redux/action/productActions";
import Swal from "sweetalert2";

export const useProductByUser = (userId) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getProductByUser(userId);

      setData(res);
    };

    fetch();
  }, [userId]);

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProductById(id);

        if (res) {
          const newData = data.filter((p) => p.productId !== id);

          setData(newData);

          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } else {
          Swal.fire(
            "Information!",
            "Something Went wrong in deleting!",
            "warning"
          );
        }
      }
    });
  };

  return [data, deleteProduct];
};
