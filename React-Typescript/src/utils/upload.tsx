import axios from "axios";
import { getProductByName } from "../api/products";


export const uploadImg = async (imgPost:any) => {

    const CLOUDINARY_PRESET = "longchanhthon";
    const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/chanh-thon/image/upload";

    let imgLink = "";

    const file =  imgPost?.files[0];
    console.log(file);
    
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_PRESET);
          // call api cloudinary để up ảnh lên
          const { data } = await  axios.post(CLOUDINARY_API_URL, formData, {
              headers: {
                  "Content-Type": "application/form-data",
              },
          });
          imgLink = data.url;
          // console.log(imgLink);
      }  

      return imgLink
}


export const changImage = (imgPost:any, imgPreview:any) => {
  if (imgPost) {
    imgPost.addEventListener("change", async (e:any) => {
      // handle sự kiện change để xem ảnh trên local
      if (imgPreview) {
        imgPreview.src = await URL.createObjectURL(e.target.files[0]);
      }
    });
   }
}


export const thanhT = (btnThanhToan:any, formThanhToan:any, remove:any) => {
  btnThanhToan.addEventListener("click", () => {
    formThanhToan.classList.add("active");
  });

  remove.onclick = () => {
      formThanhToan.classList.remove("active");
  };
}



export const statusOrder = (statusListOrder:any) => {
  statusListOrder.forEach((stt:any) => {
    const { id2 } = stt.dataset;
    statusListOrder.innerHTML = "<p style='background-color: greenyellow; padding: 5px 15px;border: 1px solid #3f3f3f; color:black ;border-radius: 8px;font-weight: 400;'>Chưa duyệt</p>";
    console.log(stt);

    if (id2 === "0") {
        // eslint-disable-next-line no-param-reassign
        stt.innerHTML = "<p style=\"background-color: greenyellow; padding: 5px 15px;border: 1px solid #3f3f3f; color:black ;border-radius: 8px;font-weight: 400;\">Chưa duyệt</p>";
    } else if (id2 === "1") {
        // eslint-disable-next-line no-param-reassign
        stt.innerHTML = "<span style='background-color: #FFC107;padding: 5px 15px;border: 1px solid #3f3f3f; color:#000 ;border-radius: 8px; font-weight: 400;'>Đã duyệt</span>";
    } else if (id2 === "2") {
        // eslint-disable-next-line no-param-reassign
        stt.innerHTML = "<span style='background-color: #17A2B8;padding: 5px 15px;border: 1px solid #3f3f3f; color:#fff ;border-radius: 8px; font-weight: 400;'>Đang giao</span>";
    } else if (id2 === "3") {
        // eslint-disable-next-line no-param-reassign
        stt.innerHTML = "<span style='background-color: #28A544;padding: 5px 15px;border: 1px solid #3f3f3f; color:#fff ;border-radius: 8px; font-weight: 400;'>Đã giao</span>";
    } else if (id2 === "4") {
        // eslint-disable-next-line no-param-reassign
        stt.innerHTML = "<span style='background-color: red;padding: 5px 15px;border: 1px solid #3f3f3f; color:#fff ;border-radius: 8px; font-weight: 400;'>Đã hủy đơn</span>";
    }
});
}