import React, { useState } from "react";
import { useLocation } from "react-router";
import ProductAddDropZone from "../../../components/product-add/ProductAddDropZone";
import {
  checkImageLimitSize,
  itemConditionList,
} from "../../../utilities/addProductService";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { usePostProduct } from "../../../hooks/messages/product/usePostProduct";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../redux/action/userActions";
import { Spinner } from "flowbite-react";
const ProductAddDetails = () => {
  const { state } = useLocation();
  const { user, person } = useUserInfo();
  const { platform, genre, itemValue, title } = state.info;
  const dispatch = useDispatch();
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState(platform ? [platform] : []);

  const [genreValue, setGenreValue] = useState("");
  const [genreList, setGenreList] = useState(genre ? [genre] : []);

  const [imageList, setImageList] = useState([]);

  const [cash, setCash] = useState(itemValue);
  const [description, setDescription] = useState("");

  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [itemListProduct, setItemListProduct] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [amount, setAmount] = useState(0);
  const [tradeMethod, setTradeMethod] = useState("");
  const [hasReceipts, setHasReceipts] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);

  const [condition, setCondition] = useState();
  const [conditionInfo, setConditionInfo] = useState();

  const [location, setLocation] = useState("");
  const [isDelivery, setIsDelivery] = useState(false);
  const [isMeetup, setIsMeetup] = useState(false);
  const [sending, setSending] = useState(false);
  const [onListItem] = usePostProduct();

  const onRemove = (text) => {
    const filtered = itemList.filter((_p) => _p !== text);

    setItemList(filtered);
  };

  const onRemoveGenre = (text) => {
    const filtered = genreList.filter((_p) => _p !== text);

    setGenreList(filtered);
  };

  const handleSubmit = () => {
    setItem("");
    setItemList([...itemList, item]);
  };
  const handleSubmitGenre = () => {
    setGenreValue("");
    setGenreList([...genreList, genreValue]);
  };

  const addPicture = (e) => {
    const imageInfo = e.target.files[0];

    if (imageInfo === undefined) return;

    const imageChecker = checkImageLimitSize(imageInfo, 4);

    if (imageChecker) {
      setImageList([...imageList, imageInfo]);
    } else {
      alert("Sorry, you cannot upload more than 4mb.");
    }
  };

  const addItemList = () => {
    if (itemInput.trim() === "") return;
    if (tradeMethod === "swap" && itemListProduct.length >= 1) {
      alert("Swap only allow 1 item to swap");
      setItemInput("");
      return;
    }

    setItemListProduct([...itemListProduct, itemInput]);
    setItemInput("");
  };

  const handleSubmitPost = async () => {
    if (imageList.length < 2) {
      alert("Please put atleast 2 image");
      return;
    }
    if (condition === undefined) {
      alert("Please choose a condition");
      return;
    }
    if (description.trim() === "") {
      alert("Please describe your item");
      return;
    }

    if (itemValue === undefined) {
      alert("Enter value of the item");
      return;
    }

    if (tradeMethod === "") {
      alert("Please choose a trade method");
      return;
    }
    if (
      tradeMethod === "trade-in" &&
      itemListProduct.length < 2 &&
      (amount == 0 || itemListProduct.length === 0)
    ) {
      alert("Please put an amount or items");
      return;
    }

    if (tradeMethod === "swap" && itemListProduct.length === 0) {
      alert("Please put an item");
      return;
    }
    setSending(true);

    const data = {
      value: itemValue,
      gameGenre: genreList.toString(),
      title,
      condition: conditionInfo.value,
      cash: cash,
      description,
      isGenerated: true,
      platform: itemList.toString(),
      item: itemListProduct.toString(),
      productStatus: "unsold",
      hasReceipts,
      hasWarranty,
      modelNumber,
      serialNumber,
      preferTrade: tradeMethod,
      cash: tradeMethod === "trade-in" ? amount : parseInt(cash),
      posterUserId: user.userId,
      isDeliver: isDelivery,
      isMeetup,
      location: location,
      dateCreated: new Date(),
    };

    const _result = await onListItem(imageList, data);

    if (Number.isInteger(_result)) {
      const userInfo = {
        user: {
          ...user,
          countPost: user.countPost - 1,
        },
        person: {
          ...person,
        },
      };

      dispatch(getUserInfo({ user: userInfo.user, person: userInfo.person }));

      window.location.href = `/products/details/${_result}`;
    } else if (_result === "NoPostCount") {
      alert("You dont have any count post");
    } else if (_result === "NotVerified") {
      alert("You are not verified");
    }

    setSending(false);
  };

  return (
    <div className="grid grid-cols-2 p-4 gap-x-4">
      <div>
        <h1>Product Name: {title}</h1>
        <h3>
          Price:{" "}
          <span className="text-[#CC481F] font-semibold">
            {cash}{" "}
            {conditionInfo && (
              <span className="mr-1 text-red-500 font-semibold">
                (-{conditionInfo.deduction * 100}%)
              </span>
            )}
          </span>
        </h3>
        <ProductAddDropZone
          count={imageList.length}
          onChange={addPicture}
          labeltext={"Product Images"}
        />
        <div className="my-4">
          {imageList.map((i, index) => (
            <p key={index}>{i.name}</p>
          ))}
        </div>
        <p>Condition:</p>
        <select
          onChange={(e) => {
            const value = e.target.value;
            const conditionItem = itemConditionList.find(
              (_p) => _p.id === parseInt(value)
            );
            setCondition(value);
            setConditionInfo(conditionItem);
            setCash(itemValue - itemValue * conditionItem.deduction);
          }}
          value={condition}
        >
          {itemConditionList.map((item, index) => (
            <option key={index} value={item.id}>
              {item.title} ({item.descriptionGenerated})
            </option>
          ))}
        </select>
        <div className="my-4"></div>

        <p>Supported Platform:</p>
        <div className="flex gap-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button onClick={handleSubmit}>Add</button>
        </div>
        {itemList.map((i, index) => (
          <div className="flex gap-x-2" key={index}>
            <button onClick={() => onRemove(i)}>-</button>
            <p>{i}</p>
          </div>
        ))}
        <div className="my-4"></div>
        <p>Supported Genre:</p>
        <div className="flex gap-x-2">
          <input
            type="text"
            value={genreValue}
            onChange={(e) => setGenreValue(e.target.value)}
          />
          <button onClick={handleSubmitGenre}>Add</button>
        </div>
        {genreList.map((i, index) => (
          <div className="flex gap-x-2" key={index}>
            <button onClick={() => onRemoveGenre(i)}>-</button>
            <p>{i}</p>
          </div>
        ))}
        <div className="my-4"></div>
        <p>Description:</p>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
        />

        <div className="my-4"></div>
        <p>Serial Number:</p>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Serial number..."
        />

        <div className="my-4"></div>
        <p>Model Number:</p>
        <input
          type="text"
          value={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
          placeholder="Model number..."
        />

        <div className="my-4"></div>
        <p>Trade Method:</p>
        <select
          value={tradeMethod}
          onChange={(e) => {
            const value = e.target.value;
            setTradeMethod(value);
            setItemInput("");
            setItemListProduct([]);
            setAmount(0);
          }}
        >
          <option value="cash">Cash</option>
          <option value="swap">Swap</option>
          <option value="trade-in">Trade-in</option>
        </select>
        {tradeMethod === "trade-in" && (
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="my-2"
            />
            <div className="flex gap-x-2">
              <input
                type="text"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
              />
              <button onClick={addItemList}>Add</button>
            </div>
          </div>
        )}
        {tradeMethod === "swap" && (
          <div>
            <div className="flex gap-x-2">
              <input
                type="text"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
              />
              <button onClick={addItemList}>Add</button>
            </div>
          </div>
        )}
        {(tradeMethod === "trade-in" || tradeMethod === "swap") && (
          <div>
            {itemListProduct.map((i, index) => (
              <p key={index}>{i}</p>
            ))}
          </div>
        )}
        <div>
          <input
            type="checkbox"
            defaultChecked={hasWarranty}
            onChange={() => setHasWarranty(!hasWarranty)}
          />{" "}
          <label>Has Warranty</label>
        </div>
        <div className="my-4"></div>

        <div>
          <input
            type="checkbox"
            defaultChecked={hasReceipts}
            onChange={() => setHasReceipts(!hasReceipts)}
          />{" "}
          <label>Has Receipt</label>
        </div>
      </div>
      <div>
        Shipping Details:
        <div>
          <input
            type="checkbox"
            defaultChecked={isDelivery}
            onChange={() => setIsDelivery(!isDelivery)}
          />{" "}
          <label>Delivery</label>
        </div>{" "}
        <div>
          <input
            type="checkbox"
            defaultChecked={isMeetup}
            onChange={() => setIsMeetup(!isMeetup)}
          />{" "}
          <label>Meetup</label>
        </div>{" "}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location..."
        />
        <button onClick={handleSubmitPost}>
          {sending ? <Spinner /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default ProductAddDetails;
