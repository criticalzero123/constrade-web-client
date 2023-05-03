import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useGetAllWalletUser from "../../hooks/wallet/useGetAllWalletUser";
import { useLocation } from "react-router";
import { Spinner } from "flowbite-react";
import useSendMoney from "../../hooks/wallet/useSendMoney";
import Swal from "sweetalert2";

const SendWallet = () => {
  const { user } = useUserInfo();
  const { state } = useLocation();
  const [userWalletId, setUserWalletId] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [data] = useGetAllWalletUser();
  const [sendMoneyTrigger] = useSendMoney();

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [amount, setAmount] = useState(0);

  const onSendMoney = async () => {
    setSending(true);
    let result = await sendMoneyTrigger(state.walletId, userWalletId, amount);

    if (result === "NotEnough") {
      alert("Money is not enough");
      setSending(false);
      return;
    }

    if (result === "Error") {
      alert("Something went wrong");
      setSending(false);
      return;
    }

    if (result === "UserNotFound") {
      alert("User is not found.");
      setSending(false);
      return;
    }

    if (result === "Success") {
      Swal.fire({
        title: "Success",
        text: "Your transaction is being process.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/wallet";
        }
      });
      setSending(false);
      return;
    }
  };

  const handleSearch = () => {
    if (selectedUserEmail.trim() === "") return;

    setLoading(true);

    const _walletUser = data.find(
      (_w) =>
        _w.user.email.toLowerCase().trim() ===
        selectedUserEmail.toLowerCase().trim()
    );

    if (_walletUser === undefined) {
      alert("User Not Found!");
      setUserWalletId();
      setSelectedUser();
      setLoading(false);
      return;
    } else if (_walletUser.user.userId === user.userId) {
      alert("Cannot send to own wallet");
      setUserWalletId();
      setSelectedUser();
      setLoading(false);
      return;
    }

    if (
      _walletUser.user.userType === "premium" ||
      _walletUser.user.userType === "verified"
    ) {
      setUserWalletId(_walletUser.walletId);
      setSelectedUser(_walletUser);

      setLoading(false);
    } else {
      Swal.fire({
        title: "Proceed?",
        text: "This user is not verified.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setUserWalletId(_walletUser.walletId);
          setSelectedUser(_walletUser);
        }
      });
      setLoading(false);
    }
  };

  const onClear = () => {
    setUserWalletId();
    setSelectedUser();
    setSelectedUserEmail("");
    setLoading(false);
  };

  if (data === undefined) return <p>Loading...</p>;

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-1/4 h-2/3 shadow-2xl">
        {data && userWalletId === undefined && (
          <div>
            <p className="text-gray-500">Input User Email</p>
            <input
              value={selectedUserEmail}
              onChange={(e) => setSelectedUserEmail(e.target.value)}
              placeholder="Email..."
              className="border-b border-gray-400 rounded p-2"
              type="email"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
        {!loading ? (
          userWalletId && (
            <div className="justify-between">
              <div>
                <div
                  className="flex-row justify-between items-center px-3 py-4 bg-gray-600 shadow-2xl"
                  style={{ borderRadius: 15 }}
                >
                  <div className="flex-row items-center">
                    <img
                      src={selectedUser.user.imageUrl}
                      className="w-10 h-10 rounded-full"
                      alt="users"
                    />
                    <div className="ml-2">
                      <p className="text-white capitalize font-semibold text-lg">
                        {selectedUser.person.firstName}{" "}
                        {selectedUser.person.lastName}
                      </p>
                      <p className="text-gray-300">{selectedUser.user.email}</p>
                    </div>
                  </div>
                  <button onClick={onClear}>
                    <p className="text-[#FF6838] font-semibold">Change</p>
                  </button>
                </div>

                <div className="mt-10 items-center">
                  <div className="flex-row items-center">
                    <p className="text-[#FF6838] text-2xl">₱</p>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="0.0"
                      className="text-center border-b border-gray-400 ml-1 self-start"
                    />
                  </div>
                  <p className="mt-3 text-gray-400">
                    Your available money is{" "}
                    <span className="text-[#FF6838]">₱{state.balance}</span>
                  </p>
                </div>
              </div>
              <button
                className="justify-self-end p-3 bg-[#CC481F] rounded"
                onClick={onSendMoney}
                disabled={sending}
              >
                <p className="text-center text-white font-semibold text-base">
                  {sending ? <Spinner /> : "Send"}
                </p>
              </button>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default SendWallet;
