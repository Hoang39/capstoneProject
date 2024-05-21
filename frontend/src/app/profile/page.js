"use client";

import ChatBotButton from "@/components/button/chatBotBtn";
import ScrollButton from "@/components/button/scrollBtn";
import Header from "@/components/header/header";
import Image from "next/image";

import avadefault from "../../image/login/avadefault.jpg";
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import Input from "@/components/input";
import { useRouter } from "next/navigation";

const description = {
  fullname_des:
    "Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.",
  sex: "Giới tính của bạn Nam(M) / Nữ(F)",
  phone_des: "Điện thoại kết nối với E-Mobile Shop.",
};

export default function Profile() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const getUserInfo = await getProfile(token);
        setUserInfo(getUserInfo);
      }
    })();
  }, []);

  return (
    <>
      <ScrollButton />
      <ChatBotButton />

      <Header />

      <div className="flex mx-24 mt-8">
        <div className="w-[25%] px-4 flex flex-col gap-y-2 border-r-2 border-gray-50">
          <Image src={avadefault} className="rounded-full mx-auto" />
          <p className="text-xl font-medium text-primary_color text-center pt-2">
            {userInfo?.name}
          </p>
          <p
            className={`${
              activeTab === "profile"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium pl-4 py-1 mt-4`}
            onClick={() => setActiveTab("profile")}
          >
            Trang cá nhân
          </p>
          <p
            className={`${
              activeTab === "order"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium pl-4 py-1`}
            onClick={() => setActiveTab("order")}
          >
            Thông tin đơn hàng
          </p>
          <p
            className={`${
              activeTab === "order"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium pl-4 py-1`}
            onClick={() => {
              localStorage.removeItem("user-token");
              router.push("/");
            }}
          >
            Đăng xuất
          </p>
        </div>

        {activeTab === "profile" ? (
          <>
            <div className="px-8 flex flex-col gap-y-4 w-[75%] mb-4">
              <p className="text-xl font-bold text-primary_color">
                Trang cá nhân
              </p>

              <Input
                data={userInfo}
                title={"Họ và tên"}
                des={description.fullname_des}
                value={userInfo?.name}
                name="name"
              />
              <Input
                data={userInfo}
                title={"Giới tính"}
                des={description.sex}
                value={userInfo?.gender}
                name="gender"
              />
              <Input
                data={userInfo}
                title={"Email"}
                des={null}
                value={userInfo?.email}
                name="email"
              />
              <Input
                data={userInfo}
                title={"Số điện thoại"}
                des={description.phone_des}
                value={userInfo?.phoneNumber}
                name="phoneNumber"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
