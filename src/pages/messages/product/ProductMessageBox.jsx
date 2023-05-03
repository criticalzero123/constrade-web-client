import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { Link } from "react-router-dom";
import useProductMessages from "../../../hooks/messages/product/useProductMessages";
import ProductMessageInput from "../../../components/messages/product/ProductMessageInput";
import useProductMessageHubConnection from "../../../hooks/messages/useProductMessageHubConnection";
import { Button } from "flowbite-react";
import { BsCheckSquareFill, BsArrowRight } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useSoldProduct from "../../../hooks/transaction/useSoldProduct";
const ProductMessageBox = () => {
  const { pid } = useParams();
  const { state } = useLocation();
  const { user } = useUserInfo();

  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);
  const [onDelete, setOnDelete] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const [messageData, , deleteMessage] = useProductMessages(
    user.userId,
    state.user.userId,
    pid,
    0
  );

  const scrollDown = useRef(null);

  const onClickScrollDown = () => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  };

  const { sendMessage, message } = useProductMessageHubConnection();
  const { markAsSoldProduct } = useSoldProduct();

  //for fetching in database
  useEffect(() => {
    if (messageData === undefined) return;
    const reverseArray = [...messageData].reverse();

    if (onDelete) {
      setMessageList(reverseArray);
      setOnDelete(false);
      return;
    }

    if (firstFetch) {
      setMessageList([...messageList, ...reverseArray]);
      setFirstFetch(false);
      onClickScrollDown();
    } else {
      setMessageList([...reverseArray, ...messageList]);
    }
  }, [messageData]);

  // This if for listening the message from hub
  useEffect(() => {
    if (message === undefined) return;

    setMessageList([...messageList, message]);
    onClickScrollDown();
  }, [message]);

  useEffect(() => {
    return () => {
      setMessageList([]);
    };
  }, [pid]);

  if (messageList === undefined) return <p>Loading...</p>;

  const completeItemOnClick = async () => {
    Swal.fire({
      title: "Transaction Completed?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const info = {
          productId: pid,
          buyerUserId: state.user.userId,
          sellerUserId: user.userId,
        };
        const flag = await markAsSoldProduct(info);

        if (parseInt(flag) !== -1) {
          // navigation.navigate("TransactionDetails", {
          //   id: product.productId,
          // });
          alert("Transaction success");
        }

        return;
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Transaction Cancelled.", "error");
      }
    });
  };

  return (
    <div className="bg-[#EFF3F8] h-[87vh] rounded-md relative">
      <div className="h-[75vh] p-5 overflow-y-auto  rounded">
        {messageList.map((message, index) => (
          <div key={index}>
            {message.senderId === user.userId ? (
              <div>
                <div className="flex justify-end mt-5 mb-2 text-sm text-gray-400">
                  {/* {dateToTime(message.date.toDate())} */}
                </div>
                <div className=" flex justify-end">
                  <div className=" flex justify-end w-3/5">
                    <div className="text-end bg-[#CCE6FB]  p-3 rounded-l-2xl rounded-b-2xl max-w-fit">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mt-7 text-sm ">
                  <Link to={`/users/o/${message.senderId}`}>
                    <img
                      src={state.user.imageUrl}
                      alt={state.user.imageUrl}
                      className="h-8 w-8 mr-2 object-cover rounded-full"
                    />
                  </Link>

                  <span className="ml-2 text-gray-500">
                    {/* {dateToTime(message.date.toDate())} */}
                  </span>
                </div>

                <div className="flex justify-start w-3/5">
                  <div className="text-start mr-3 bg-white mt-2 p-3 rounded-r-2xl rounded-b-2xl max-w-fit">
                    {message.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollDown}></div>
      </div>
      {state.product ? (
        state.product.productStatus !== "sold" ? (
          <ProductMessageInput
            sendMessage={(value) =>
              sendMessage(user.userId, state.user.userId, parseInt(pid), value)
            }
          />
        ) : (
          <div className="h-1/6 flex place-item-center">
            <div className="p-5 flex w-full justify-between items-center bg-[rgb(100%,100%,100%,50%)] backdrop-blur-md">
              <div>This item is already Transacted.</div>
              <Link to={`/products/details/${pid}`}>
                <Button gradientDuoTone="greenToBlue">
                  Go to transaction <BsArrowRight size={20} className="ml-2" />
                </Button>{" "}
              </Link>
            </div>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}

      {state.product &&
        state.product.productStatus !== "sold" &&
        state.product.posterUserId === user.userId &&
        (showHeader ? (
          <div
            className={`absolute top-0 p-4 bg-[rgba(100%,100%,100%,60%)] backdrop-blur-md w-full flex place-items-center justify-between`}
          >
            <div
              className="hover:text-red-400 font-semibold text-gray-500 cursor-pointer"
              onClick={() => setShowHeader(!showHeader)}
            >
              Hide
            </div>

            <Button gradientDuoTone="greenToBlue" onClick={completeItemOnClick}>
              <BsCheckSquareFill size={20} className="mr-2" />
              Transaction Completed
            </Button>
          </div>
        ) : (
          <div className="absolute top-0 flex w-full justify-center ">
            <RiArrowDownSLine
              size={30}
              className="text-gray-300 cursor-pointer mr-24"
              onClick={() => setShowHeader(!showHeader)}
            />{" "}
          </div>
        ))}
    </div>
  );
};

export default ProductMessageBox;
