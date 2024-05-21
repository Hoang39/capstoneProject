"use client";

import ChatBotButton from "@/components/button/chatBotBtn";
import ScrollButton from "@/components/button/scrollBtn";
import Header from "@/components/header/header";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

import wishlist from "../../image/cart/wishlist.png";

export default function Cart() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const { listCart, addCart, removeCart, fetchCart } = useCart();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const getUserInfo = await getProfile(token);
        setUserInfo(getUserInfo);

        fetchCart(token);
      }
    })();
  }, []);

  return (
    <>
      <ScrollButton />
      <ChatBotButton />

      <Header />

      <p className="font-bold text-primary_color text-lg font-bold text-center mt-4">
        GIỎ HÀNG
      </p>

      {listCart && listCart?.length ? (
        <div className="my-8 mx-20 flex flex-col items-center">
          <div className="overflow-y-auto h-160 flex flex-col gap-4 gap-y-6 mt-8">
            {listCart?.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between border-b-2 border-gray-100 pt-8"
              >
                <div className="flex flex-row gap-x-2 items-center">
                  <svg
                    onClick={() => {
                      dltItem(item);
                      setLoad(!load);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="cursor-pointer w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <img
                    className="w-32 h-32 rounded-lg"
                    src={item.imageUrl}
                    alt="list"
                  />
                  <div className="flex flex-col gap-y-2 min-w-[320px]">
                    <p className="text-lg">{item.name}</p>
                    <p className="text-lg">
                      {item.quantitySell * item.unitPrice} VND
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                  <button
                    onClick={() => {
                      item.quantitySell -= 1;
                      if (item.quantitySell < 1) item.quantitySell = 1;
                      setLoad(!load);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <div className="m-auto rounded-2xl px-2">
                    {item.quantitySell}
                  </div>
                  <button
                    onClick={() => {
                      item.quantitySell = parseInt(item.quantitySell) + 1;
                      setLoad(!load);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 py-4">
            <p className="font-bold text-lg">Phương thức thanh toán:</p>
            <input
              onChange={() => setPayment("Momo")}
              type="radio"
              id="Momo"
              name="fav_language"
              value="Momo"
            />
            <label className="text-lg font-bold" htmlFor="Momo">
              Momo
            </label>
            <br></br>

            <input
              onChange={() => setPayment("Direct")}
              type="radio"
              id="direct"
              name="fav_language"
              value="direct"
            />
            <label className="text-lg font-bold" htmlFor="direct">
              Trực tiếp
            </label>
            <br></br>
          </div>

          <button
            onClick={handleCart}
            className="text-white font-semibold bg-primary_color w-1/2 rounded-xl py-2 px-4"
          >
            Đặt hàng ngay
          </button>
        </div>
      ) : (
        <div className="flex flex-col text-center justify-center items-center gap-y-4 pt-4">
          <p className="text-sub_primary_color text-sm font-meidum">
            Hiện bạn đang chưa có món hàng nào
          </p>
          <Image className="mx-auto" width={200} src={wishlist} alt="list" />
          <p className="text-sub_primary_color text-sm font-meidum">
            Xem qua các mặt hàng và mua ngay nào!
          </p>
          <button
            className="text-white font-semibold bg-primary_color w-fit rounded-xl p-2 px-6 mb-8"
            onClick={() => {
              router.push("/");
            }}
          >
            Mua hàng ngay
          </button>
        </div>
      )}
    </>
  );
}
