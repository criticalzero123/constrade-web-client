import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { BsLink } from "react-icons/bs";
import { Tooltip } from "flowbite-react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import html2canvas from "html2canvas";
import logo from "../../../assets/branding/icon.png";
import background from "../../../assets/branding/background.png";
import { QRCodeCanvas } from "qrcode.react";
const ProductShare = ({ title, description }) => {
  const fullUrl = window.location.href;
  const exportQrImage = () => {
    const canva = document.getElementById("qrCodePic");

    html2canvas(canva).then((canvas) => {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = title + ".png";
      // Remove the created and invisible link.
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  return (
    <div className="flex place-items-center">
      <span>Share: </span>
      <span className="px-1"></span>
      {/* Facebook */}
      <FacebookShareButton
        quote={title}
        url={fullUrl}
        description={description}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      {/* Link */}
      <span className="px-1"></span>
      <Tooltip content="Link Copied!" arrow={false} trigger="click">
        <BsLink
          size={29}
          className="p-1 rounded-full bg-gray-200 text-black cursor-pointer"
          onClick={() => navigator.clipboard.writeText(fullUrl)}
        />
      </Tooltip>
      <span className="px-1"></span>
      {/* QRCode Download */}
      {/*  Hide the qr code in out of page */}
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className="block absolute p-6 -z-10 -top-[100rem] border rounded-lg bg-gray-200 text-black w-[346px] h-fit"
        id="qrCodePic"
      >
        <div className="p-5 bg-white rounded-lg z-10">
          <p className="font-poppins text-lg mb-5 text-center font-semibold tracking-wide">
            {title}
          </p>
          <QRCodeCanvas
            value={fullUrl}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
              src: logo,
              x: undefined,
              y: undefined,
              height: 30,
              width: 40,
              excavate: true,
            }}
          />
        </div>
      </div>

      <MdOutlineQrCodeScanner
        size={29}
        className="p-1 rounded-full  bg-gray-200 text-black cursor-pointer"
        onClick={exportQrImage}
      />
    </div>
  );
};

export default ProductShare;
