import React, { useState } from "react";
import { useLocation } from "react-router";
import { editProduct } from "../../../redux/action/productActions";
import { Spinner } from "flowbite-react";
const ProductEdit = () => {
  const { state: product } = useLocation();
  const stringToArrayList = (value) => {
    return value.split(",");
  };

  const _strGenreList = stringToArrayList(product.gameGenre);
  const _strPlatformList = stringToArrayList(product.platform);

  const [platformModalVisible, setPlatformModalVisible] = useState(false);
  const [genreModalVisible, setGenreModalVisible] = useState(false);

  const [platform, setPlatform] = useState("");
  const [tempPlatformList, setTempPlatformList] = useState(_strPlatformList);
  const [platformList, setPlatformList] = useState(_strPlatformList);

  const [genreValue, setGenreValue] = useState("");
  const [tempGenreList, setTempGenreList] = useState(_strGenreList);
  const [genreList, setGenreList] = useState(_strGenreList);

  const [description, setDescription] = useState(product.description);
  const [modelNumber, setModelNumber] = useState(product.modelNumber);
  const [serialNumber, setSerialNumber] = useState(product.serialNumber);
  const [hasReceipts, setHasReceipts] = useState(product.hasReceipts);
  const [hasWarranty, setHasWarranty] = useState(product.hasWarranty);
  const [location, setLocation] = useState(product.location);
  const [isDelivery, setIsDelivery] = useState(product.isDeliver);
  const [isMeetup, setIsMeetup] = useState(product.isMeetup);
  const [sending, setSending] = useState(false);

  const validation = () => {
    if (description.trim() === "") {
      alert("Please input description");
      return;
    }

    if (genreList.length === 0) {
      alert("Please input genre");
      return;
    }

    if (platformList.length === 0) {
      alert("Please input platform");
      return;
    }

    if (!isMeetup && !isDelivery) {
      alert("Please input delivery details");
      return;
    }

    if (location.trim() === "") {
      alert("Please input location details");
      return;
    }
  };
  const onSubmit = async () => {
    validation();
    setSending(true);

    const productDetails = {
      ...product,
      gameGenre: genreList.toString(),
      platform: platformList.toString(),
      description: description,
      modelNumber: modelNumber,
      serialNumber: serialNumber,
      isMeetup: isMeetup,
      isDeliver: isDelivery,
      hasWarranty: hasWarranty,
      hasReceipts: hasReceipts,
      location: location,
    };

    const result = await editProduct(product.productId, productDetails);

    if (result) {
      alert("Product Updated");
      window.location.href = `/products/details/${product.productId}`;
    } else {
      alert("Server cannot be reach.");
      setSending(false);
    }
  };

  const onRemove = (text) => {
    const filtered = platformList.filter((_p) => _p !== text);

    setPlatformList(filtered);
  };

  const onRemoveGenre = (text) => {
    const filtered = genreList.filter((_p) => _p !== text);

    setGenreList(filtered);
  };

  const handleSubmit = () => {
    setPlatform("");
    setPlatformList([...platformList, platform]);
  };
  const handleSubmitGenre = () => {
    setGenreValue("");
    setGenreList([...genreList, genreValue]);
  };

  return (
    <div className="container px-4">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
      />
      <div className="my-4"></div>
      <input
        type="text"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      />
      <div className="my-4"></div>
      <input
        type="text"
        value={modelNumber}
        onChange={(e) => setModelNumber(e.target.value)}
      />
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
      <div className="my-4"></div>
      <p>Supported Platform:</p>
      <div className="flex gap-x-2">
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      {platformList.map((i, index) => (
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
      <br />
      <button onClick={onSubmit}>{sending ? <Spinner /> : "Post"}</button>
    </div>
  );
};

export default ProductEdit;
