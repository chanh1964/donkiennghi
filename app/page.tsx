"use client"; // Required if using App Router components

import React, { ReactNode, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "next/form";
import FieldInput from "./FieldInput";
import OpinionInput from "./OpinionInput";

interface FormDataState {
  [key: string]: string;
}

const OpinionsList = (props: { entries: ReactNode[] }) => {
  const notify = () =>
    toast.warn(
      "Đây là ý kiến cực kỳ quan trọng, đòi hỏi sự đồng lòng của nhân dân! Vui lòng xem xét lại!",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      },
    );
  // toast(
  //   "Đây là ý kiến cực kỳ quan trọng, đòi hỏi sự đồng lòng của nhân dân! Vui lòng xem xét lại!",
  // );
  const handleClick = (event: React.MouseEvent) => {
    const button = event.target as HTMLElement;
    const li = button.parentElement?.parentElement;
    li?.classList.toggle("not-print");
    if (li?.classList.contains("not-print")) {
      notify();
      button.innerText = "Giữ lại ý kiến này";
    } else {
      button.innerText = "Xoá ý kiến này";
    }
  };

  return (
    <ul id="opinions">
      {props.entries.map((value) => value)}
      <li key="opinion_giadenbu" id="opinion_giadenbu">
        <p className="underline">
          <button
            type="button"
            className="border-1 mb-0.5 px-1 mr-1 cursor-pointer bg-red-200 hover:bg-red-400 hover:font-bold print:hidden"
            onClick={handleClick}
          >
            Xoá ý kiến này
          </button>
          Về giá đền bù thu hồi đất:
        </p>
        <p>
          Tôi nhận thấy mức giá dự thảo bồi thường đất (hệ số K=1) để phục vụ Dự
          án đường vành đai 2.5 (đoạn Ngụy Như Kon Tum - Nguyễn Trãi) hiện nay
          là <strong>chưa phù hợp</strong>, còn{" "}
          <strong>thấp hơn nhiều so với giá thị trường thực tế</strong> tại khu
          vực nội thành Hà Nội, nơi tôi đang sinh sống. Mức giá này chưa đảm bảo
          quyền lợi ích hợp pháp của người dân có đất bị thu hồi.
        </p>
        <p>
          Vì vậy, tôi kính đề nghị UBND phường Thanh Xuân, UBND thành phố Hà Nội
          tổ chức xem xét, rà soát lại phương án bồi thường; đồng thời tổ chức
          đối thoại với người dân để làm căn cứ xây dựng đơn giá, xem xét điều
          chỉnh hệ số bồi thường phù hợp hơn (ví dụ: hệ số K=2) so với mức dự
          thảo hiện tại, bảo đảm tiệm cận giá thị trường.
        </p>
      </li>
      <li key="opinion_giataidinhcu">
        <p className="underline">
          <button
            type="button"
            className="border-1 mb-0.5 px-1 mr-1 cursor-pointer bg-red-200 hover:bg-red-400 hover:font-bold print:hidden"
            onClick={handleClick}
          >
            Xoá ý kiến này
          </button>
          Về giá đất nơi tái định cư:
        </p>
        <p>
          Tôi kính đề nghị cơ quan có thẩm quyền{" "}
          <strong>
            làm rõ vị trí tái định cư, đơn giá đất cụ thể tại khu tái định cư
          </strong>{" "}
          trong thông báo phương án bồi thường, hỗ trợ và tái định cư để người
          dân được biết, có cơ sở tính toán, qua đó{" "}
          <strong>bảo đảm khả năng ổn định chỗ ở và đời sống</strong> của gia
          đình tôi sau khi Nhà nước thu hồi đất.
        </p>
      </li>
    </ul>
  );
};

export default function Home() {
  // Define state for the input value with a string type
  const [formData, setFormData] = useState<FormDataState>({
    day: "",
    month: "",
  });

  // Define the event handler with the correct TypeScript type
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Access the value using event.target.value
    console.log(`${event.target.name}: ${event.target.value}`);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInvalid = (event: React.SyntheticEvent<HTMLFormElement>) => {
    // Set a custom message when the field is invalid
    (event.target as HTMLInputElement).setCustomValidity(
      "Vui lòng điền thông tin này.",
    );
  };

  const handleInput = (event: React.SyntheticEvent<HTMLFormElement>) => {
    // Reset the message as the user starts typing or corrects the input
    (event.target as HTMLInputElement).setCustomValidity("");
  };

  // Optional: A handler for a form submission
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.print();
  };

  const [optionalOpinions, setOptionalOpinions] = useState<ReactNode[]>([]);

  const addOpinion = () => {
    const key = `opinion_${(Math.random() * 1e7).toFixed(0)}`;
    const opinion = <OpinionInput key={key} name={key} />;
    setOptionalOpinions([...optionalOpinions, opinion]);
  };

  return (
    <main
      className="bg-gray-200 flex flex-col justify-center items-center m-0 p-5 lg:p-16
      print:w-fit print:py-0 print:block print:bg-white"
    >
      <ToastContainer className="font-bold" />
      <p className="print:hidden bg-white p-2">
        Đây là mẫu đơn kiến nghị của nhân dân phường Thanh Xuân, TP. Hà Nội về
        những bất cập trong &quot;Dự thảo phương án bồi thường, hỗ trợ, tái định
        cư&quot; của &quot;Dự án đường vành đai 2.5 (đoạn Ngụy Như Kon Tum -
        Nguyễn Trãi)&quot;.{" "}
      </p>

      <h1 className="print:hidden font-bold mb-5 bg-yellow-50 p-2">
        <span className="text-red-600 underline">
          Hướng dẫn sử dụng: <br />
        </span>
        Điền đầy đủ thông tin vào mẫu đơn kiến nghị dưới đây, sau đó nhấn nút
        &quot;IN ĐƠN&quot; (màu xanh dương) để in đơn.
      </h1>

      <Form
        action={"#"}
        onSubmit={handleSubmit}
        onInvalid={handleInvalid}
        onInput={handleInput}
        className="max-w-[210mm] bg-white shadow-xl p-5 lg:p-[2.54cm] border-1 
        print:w-[210mm] print:border-0 print:shadow-none print:p-0"
      >
        <div className="">
          <p className="!text-center font-bold">
            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </p>
          <p className="!text-center font-bold">Độc lập - Tự do - Hạnh phúc</p>
        </div>
        <div>
          <p className="!text-right italic">
            Hà Nội, ngày{" "}
            <FieldInput
              name="day"
              value={formData.day}
              onChange={handleChange}
              required={true}
              className="w-6 text-center"
            />{" "}
            tháng{" "}
            <FieldInput
              name="month"
              value={formData.month}
              onChange={handleChange}
              required={true}
              className="w-6 text-center"
            />{" "}
            năm 2026
          </p>
        </div>
        <div>
          <p className="!text-center font-bold">ĐƠN KIẾN NGHỊ</p>
          <p className="!text-center font-bold !mb-5">
            Về những nội dung trong Dự thảo phương án bồi thường, hỗ trợ, tái
            định cư
            <br />
            của Dự án đường vành đai 2.5 (đoạn Ngụy Như Kon Tum - Nguyễn Trãi)
          </p>
        </div>
        <div>
          <p>Kính gửi:</p>
          <ul>
            <li className="italic">
              <p>UBND phường Thanh Xuân, TP. Hà Nội;</p>
            </li>
            <li className="italic">
              <p>Hội đồng bồi thường hỗ trợ, tái định cư phường Thanh Xuân;</p>
            </li>
          </ul>
        </div>
        <div
          className={
            "flex " + `print:${formData.fullname == "" ? "hidden" : "flex"}`
          }
        >
          <div className="flex-none">
            <p>Tôi tên là: </p>
          </div>
          <div className="flex-1">
            <FieldInput
              name="fullname"
              value={formData.fullname}
              required={true}
              className="pl-2 w-full"
              placeholder="Điền Họ và Tên"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-none">
            <p>Địa chỉ: </p>
          </div>
          <div className="flex-1">
            <FieldInput
              name="address"
              value={formData.address}
              required={true}
              className="pl-2 w-full"
              placeholder="Điền Địa chỉ"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-none">
            <p>Số điện thoại: </p>
          </div>
          <div className="flex-1">
            <FieldInput
              name="phonenumber"
              value={formData.phonenumber}
              required={true}
              className="pl-2 w-full"
              placeholder="Điền Số Điện thoại"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-none">
            <p>Số căn cước công dân: </p>
          </div>
          <div className="flex-1">
            <FieldInput
              name="cccd"
              value={formData.cccd}
              required={true}
              className="pl-2 w-full"
              placeholder="Điền Số CCCD"
            />
          </div>
        </div>
        <div>
          <p>
            Tôi là chủ sở hữu hợp pháp của thửa đất số{" "}
            <FieldInput
              name="land_num"
              value={formData.land_num}
              required={true}
              className="text-center max-w-35"
              placeholder="Điền Số thửa đất"
            />{" "}
            theo Giấy chứng nhận quyền sử dụng đất (GCNQSDĐ) số{" "}
            <FieldInput
              name="land_doc_num"
              value={formData.land_doc_num}
              required={true}
              className="text-center max-w-35"
              placeholder="Điền Số GCNQSDĐ"
            />{" "}
            do UBND Thành phố Hà Nội cấp ngày{" "}
            <FieldInput
              name="land_doc_date"
              value={formData.land_doc_date}
              required={true}
              className="text-center max-w-35"
              placeholder="Điền Ngày cấp"
            />
            .
          </p>
        </div>

        <p>
          Tôi có một số ý kiến kiến nghị vào bản dự thảo như sau:{" "}
          <button
            type="button"
            className="border-1 mb-0.5 px-1 cursor-pointer bg-yellow-200 hover:bg-yellow-400 hover:font-bold print:hidden"
            onClick={addOpinion}
          >
            Thêm ý kiến khác
          </button>
        </p>

        <OpinionsList entries={optionalOpinions} />

        <div>
          <p>
            Gia đình tôi luôn chấp hành và ủng hộ chủ trương, chính sách của
            Đảng và Nhà nước trong việc thu hồi đất để thực hiện các dự án trọng
            điểm quốc gia, góp phần phát triển kinh tế - xã hội. Tuy nhiên, tôi
            kính đề nghị các cơ quan có thẩm quyền xem xét bảo đảm mức bồi
            thường và giá đền bù thỏa đáng, tương xứng với giá trị thực tế của
            quyền sử dụng đất.
          </p>
          <p>
            Tôi kính mong Hội đồng bồi thường, giải phóng mặt bằng và tái định
            cư quan tâm xem xét các kiến nghị nêu trên của gia đình tôi và sớm
            giải quyết theo quy định của pháp luật.
          </p>
          <p>Tôi xin trân trọng cảm ơn!</p>
        </div>

        <div className="float-right print:break-inside-avoid">
          <p className="italic">
            Hà Nội, ngày{" "}
            <input
              name="_day"
              value={formData.day}
              disabled
              className="bg-gray-200 border-b-1 border-dotted print:bg-white w-6 text-center"
            />{" "}
            tháng{" "}
            <input
              name="_month"
              value={formData.month}
              disabled
              className="bg-gray-200 border-b-1 border-dotted print:bg-white w-6 text-center"
            />{" "}
            năm 2026
          </p>
          <p className="font-bold !text-center !mb-20">
            NGƯỜI LÀM ĐƠN
            <span className="print:hidden font-normal">
              <br />
              (In, ký và ghi rõ họ tên)
              <br />
              <button
                type="submit"
                className="mt-2 border-1 bg-blue-200 rounded-sm hover:bg-blue-400 cursor-pointer p-2 hover:font-bold"
              >
                IN ĐƠN
              </button>
            </span>
          </p>
        </div>
      </Form>
    </main>
  );
}
