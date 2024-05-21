const Message = require("../models/messageModel.js");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";

// const MODEL_NAME = "tunedModels/emobilellm-q11jc35aebrb";

class MessageController {
  //  [ POST - ROUTE: api/user]
  sendMessage = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    await Message.create({
      user: req.user._id,
      typeUser: "user",
      typeMessage: "text",
      content: prompt,
      startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
    });

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      { text: "input: Xiaomi Redmi Note 12 (8GB/128GB) bao nhiêu inches?" },
      {
        text: "output: 6,67 inch. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      {
        text: "input: Chỉ số PPI của màn hình Xiaomi Redmi Note 12 (8GB/128GB) là bao nhiêu?",
      },
      {
        text: "output: Không có thông tin về chỉ số PPI trong dữ liệu đã cung cấp. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      {
        text: "input: Xiaomi Redmi Note 12 (8GB/128GB) được trang bị viên pin dung lượng bao nhiêu?",
      },
      {
        text: "output: 5.000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      {
        text: "input: Bộ nhớ trong Xiaomi Redmi Note 12 (8GB/128GB) là bao nhiêu GB?",
      },
      { text: "output: 128GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`" },
      {
        text: "input: Camera chính Xiaomi Redmi Note 12 (8GB/128GB) có độ phân giải là bao nhiêu MP?",
      },
      { text: "output: 50MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`" },
      {
        text: "input: Camera trước Xiaomi Redmi Note 12 (8GB/128GB) có độ phân giải là bao nhiêu MP?",
      },
      { text: "output: 13MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`" },
      { text: "input: Xiaomi Redmi Note 12 (8GB/128GB) có mấy màu?" },
      {
        text: "output: 3 màu: Xanh bấc hà, Xanh băng tuyết và Xám thạch anh. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      {
        text: "input: Xiaomi Redmi Note 12 (8GB/128GB) có hỗ trợ mạng 5G không?",
      },
      {
        text: "output: Không, không hỗ trợ. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      {
        text: "input: Xiaomi Redmi Note 12 (8GB/128GB) hỗ trợ tốc độ làm tươi màn hình bao nhiêu Hz?",
      },
      { text: "output: 120Hz. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`" },
      {
        text: "input: Xiaomi Redmi Note 12 (8GB/128GB) có hỗ trợ khe cắm thẻ nhớ ngoài không?",
      },
      {
        text: "output: Không có thông tin về khe cắm thẻ nhớ ngoài trong dữ liệu đã cung cấp. Theo dõi sản phẩm `6572e866fd97ccc315eaddf5`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có giá bao nhiêu?" },
      {
        text: "output: Giá của Vivo Y22s 8GB/128GB là 4.590.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      { text: "input: Vivo Y22s 8GB/128GB được trang bị vi xử lý nào?" },
      {
        text: "output: Vivo Y22s 8GB/128GB được trang bị vi xử lý Snapdragon 680 8 nhân. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      { text: "input: Bộ nhớ RAM của Vivo Y22s 8GB/128GB là bao nhiêu?" },
      {
        text: "output: Vivo Y22s 8GB/128GB có bộ nhớ RAM 8GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Điện thoại Vivo Y22s 8GB/128GB có sở hữu camera selfie không?",
      },
      {
        text: "output: Có, Vivo Y22s 8GB/128GB sở hữu camera selfie 8MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Camera chính của Vivo Y22s 8GB/128GB có thông số bao nhiêu?",
      },
      {
        text: "output: Camera chính của Vivo Y22s 8GB/128GB có thông số là 50MP với khẩu độ f/1.8. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Camera macro của Vivo Y22s 8GB/128GB có thông số bao nhiêu?",
      },
      {
        text: "output: Camera macro của Vivo Y22s 8GB/128GB có thông số là 2MP với khẩu độ f/2.4. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Vivo Y22s 8GB/128GB có hỗ trợ công nghệ sạc nhanh không?",
      },
      {
        text: "output: Có, Vivo Y22s 8GB/128GB có hỗ trợ công nghệ sạc nhanh 18W. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Điện thoại Vivo Y22s 8GB/128GB có hỗ trợ kết nối 5G không?",
      },
      {
        text: "output: Không, Vivo Y22s 8GB/128GB không hỗ trợ kết nối 5G. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Màn hình của Vivo Y22s 8GB/128GB có tần số quét bao nhiêu?",
      },
      {
        text: "output: Màn hình của Vivo Y22s 8GB/128GB có tần số quét lên đến 90Hz. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      {
        text: "input: Vivo Y22s 8GB/128GB được bảo hành chính hãng trong bao lâu?",
      },
      {
        text: "output: Vivo Y22s 8GB/128GB được bảo hành chính hãng trong thời gian 12 tháng. Theo dõi sản phẩm `6572e866fd97ccc315eaddf6`",
      },
      { text: "input: Vivo Y16 4GB/128GB có giá bao nhiêu?" },
      {
        text: "output: Giá của Vivo Y16 4GB/128GB là 3.450.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Camera trước của Vivo Y16 4GB/128GB có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Độ phân giải của camera trước của Vivo Y16 4GB/128GB là 5MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Vivo Y16 4GB/128GB có chế độ bảo hành chính hãng bao lâu?",
      },
      {
        text: "output: Vivo Y16 4GB/128GB được bảo hành chính hãng trong vòng 12 tháng. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      { text: "input: Bộ nhớ lưu trữ của Vivo Y16 4GB/128GB là bao nhiêu?" },
      {
        text: "output: Bộ nhớ lưu trữ của Vivo Y16 4GB/128GB là 128GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Vivo Y16 4GB/128GB có thể hỗ trợ đa dạng chế độ chụp như thế nào?",
      },
      {
        text: "output: Vivo Y16 4GB/128GB có thể hỗ trợ đa dạng chế độ chụp như góc rộng, chụp chân dung… Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      { text: "input: Dung lượng pin của Vivo Y16 4GB/128GB là bao nhiêu?" },
      {
        text: "output: Dung lượng pin của Vivo Y16 4GB/128GB là 5000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Vivo Y16 4GB/128GB được tích hợp những tính năng nào để mang đến trải nghiệm chơi game mượt nhất?",
      },
      {
        text: "output: Vivo Y16 4GB/128GB được tích hợp tính năng Multi Turbo 2.2 và Ultra Game Mode để mang đến trải nghiệm chơi game mượt nhất với độ trễ gần như không có. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      { text: "input: Vivo Y16 4GB/128GB sử dụng loại màn hình nào?" },
      {
        text: "output: Vivo Y16 4GB/128GB sử dụng màn hình LCD với thiết kế notch “giọt nước” và phần viền cực mỏng. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Màn hình của Vivo Y16 4GB/128GB có kích thước và độ phân giải như thế nào?",
      },
      {
        text: "output: Màn hình của Vivo Y16 4GB/128GB có kích thước lên tới 6.51 inch, độ phân giải 1600 x 720 pixels. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      {
        text: "input: Camera kép sau của Vivo Y16 4GB/128GB bao gồm những ống kính nào?",
      },
      {
        text: "output: Camera kép sau của Vivo Y16 4GB/128GB bao gồm camera chính 13MP, khẩu độ f/2.2 và camera phụ 2MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf7`",
      },
      { text: "input: OPPO A17 4GB/64GB có giá bao nhiêu?" },
      {
        text: "output: Giá của OPPO A17 4GB/64GB là 3.590.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB có mấy màu?" },
      {
        text: "output: OPPO A17 4GB/64GB có 2 màu là đen và xanh nước biển. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB có dung lượng pin là bao nhiêu?" },
      {
        text: "output: OPPO A17 4GB/64GB có dung lượng pin là 5000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: Chip của OPPO A17 4GB/64GB là gì?" },
      {
        text: "output: OPPO A17 4GB/64GB sử dụng chip MediaTek Helio G35. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      {
        text: "input: Camera chính của OPPO A17 4GB/64GB có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Camera chính của OPPO A17 4GB/64GB có độ phân giải 50MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      {
        text: "input: Camera trước của OPPO A17 4GB/64GB có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Camera trước của OPPO A17 4GB/64GB có độ phân giải 5MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB chạy hệ điều hành gì?" },
      {
        text: "output: OPPO A17 4GB/64GB chạy hệ điều hành Android 12 với giao diện ColorOS 12.1. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB có hỗ trợ mở rộng bộ nhớ không?" },
      {
        text: "output: Có, OPPO A17 4GB/64GB hỗ trợ mở rộng bộ nhớ qua khe cắm thẻ nhớ microSD tối đa 512GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB có hỗ trợ sạc nhanh không?" },
      {
        text: "output: Không có thông tin về khả năng sạc nhanh của OPPO A17 4GB/64GB trong phần mô tả đã cung cấp. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A17 4GB/64GB có thiết kế như thế nào?" },
      {
        text: "output: OPPO A17 4GB/64GB có thiết kế cá tính, với phần khung viền vuông vức cùng các cạnh góc được bo cong mềm mại, mặt lưng được hoàn thiện bằng chất liệu nhựa nhám vô cùng tỉ mỉ, hạn chế bám vân tay. Theo dõi sản phẩm `6572e866fd97ccc315eaddf8`",
      },
      { text: "input: OPPO A16K 4GB/64GB có giá bao nhiêu?" },
      {
        text: "output: Giá của OPPO A16K 4GB/64GB là 2.890.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: OPPO A16K 4GB/64GB nặng bao nhiêu?" },
      {
        text: "output: OPPO A16K 4GB/64GB nặng khoảng 175 gram. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: OPPO A16K 4GB/64GB có màn hình kích thước bao nhiêu?" },
      {
        text: "output: OPPO A16K 4GB/64GB có màn hình kích thước 6,5 inch. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: Độ phân giải màn hình của OPPO A16K 4GB/64GB là gì?" },
      {
        text: "output: Độ phân giải màn hình của OPPO A16K 4GB/64GB là HD+ (1600 x 720 pixel). Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      {
        text: "input: OPPO A16K 4GB/64GB có kính cường lực bảo vệ màn hình không?",
      },
      {
        text: "output: Có, OPPO A16K 4GB/64GB được trang bị kính cường lực Corning Gorilla Glass 3 (GG3). Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: Bộ vi xử lý của OPPO A16K 4GB/64GB là gì?" },
      {
        text: "output: OPPO A16K 4GB/64GB được trang bị bộ vi xử lý MediaTek Helio G35. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      {
        text: "input: Dung lượng RAM và bộ nhớ trong của OPPO A16K 4GB/64GB là bao nhiêu?",
      },
      {
        text: "output: OPPO A16K 4GB/64GB có dung lượng RAM 4GB và bộ nhớ trong 64GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      {
        text: "input: Độ phân giải của camera chính trên OPPO A16K 4GB/64GB là bao nhiêu?",
      },
      {
        text: "output: Độ phân giải của camera chính trên OPPO A16K 4GB/64GB là 13MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: OPPO A16K 4GB/64GB có dung lượng pin là bao nhiêu?" },
      {
        text: "output: Dung lượng pin của OPPO A16K 4GB/64GB là 5.000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: Mức độ kháng nước của OPPO A16K 4GB/64GB là gì?" },
      {
        text: "output: OPPO A16K 4GB/64GB có mức độ kháng nước IPX4, nghĩa là nó có thể chịu được mưa nhẹ hoặc nước bắn vào. Theo dõi sản phẩm `6572e866fd97ccc315eaddf9`",
      },
      { text: "input: Nokia G11 Plus 3GB/32GB có giá bao nhiêu?" },
      {
        text: "output: Giá của Nokia G11 Plus 3GB/32GB là 1.950.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      { text: "input: Nokia G11 Plus 3GB/32GB có những màu sắc nào?" },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có 2 màu sắc: đen và xanh. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      {
        text: "input: Nokia G11 Plus 3GB/32GB có kích thước màn hình là bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có kích thước màn hình 6,5 inch. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      { text: "input: Nokia G11 Plus 3GB/32GB có bộ nhớ RAM bao nhiêu?" },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có bộ nhớ RAM 3GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      { text: "input: Nokia G11 Plus 3GB/32GB có viên pin bao nhiêu mAh?" },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có viên pin 5000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      {
        text: "input: Nokia G11 Plus 3GB/32GB có camera sau chính có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có camera sau chính độ phân giải 50MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      {
        text: "input: Nokia G11 Plus 3GB/32GB có thể quay video ở độ phân giải nào?",
      },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có thể quay video ở độ phân giải Full HD 1080p. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      { text: "input: Nokia G11 Plus 3GB/32GB có cổng kết nối nào?" },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có cổng kết nối USB Type-C và jack cắm tai nghe 3,5 mm. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      {
        text: "input: Nokia G11 Plus 3GB/32GB được bảo hành trong thời gian bao lâu?",
      },
      {
        text: "output: Nokia G11 Plus 3GB/32GB được bảo hành chính hãng trong thời gian 12 tháng. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      {
        text: "input: Nokia G11 Plus 3GB/32GB có chế độ mở khóa bằng vân tay không?",
      },
      {
        text: "output: Nokia G11 Plus 3GB/32GB có chế độ mở khóa bằng vân tay ở cạnh thân máy. Theo dõi sản phẩm `6572e866fd97ccc315eaddfa`",
      },
      { text: "input: Samsung Galaxy A04 có mấy màu?" },
      {
        text: "output: 3 màu: Đồng ánh hồng, Xanh dương xỉ và Đen tinh vân. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      {
        text: "input: Camera chính của Samsung Galaxy A04 có độ phân giải bao nhiêu?",
      },
      { text: "output: 50MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`" },
      { text: "input: Samsung Galaxy A04 có RAM bao nhiêu GB?" },
      {
        text: "output: 2 phiên bản: 3GB/4GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      {
        text: "input: Bộ nhớ trong của Samsung Galaxy A04 có dung lượng bao nhiêu?",
      },
      {
        text: "output: 2 phiên bản: 32GB/64GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      { text: "input: Samsung Galaxy A04 có chức năng RAM Plus không?" },
      { text: "output: Có. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`" },
      { text: "input: Công nghệ âm thanh trên Samsung Galaxy A04 là gì?" },
      {
        text: "output: Dolby Atmos. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      { text: "input: Dung lượng pin của Samsung Galaxy A04 là bao nhiêu?" },
      {
        text: "output: 5.000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      { text: "input: Samsung Galaxy A04 có hỗ trợ sạc nhanh không?" },
      { text: "output: Có, 15W. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`" },
      { text: "input: Samsung Galaxy A04 có hỗ trợ mạng 5G không?" },
      { text: "output: Không. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`" },
      { text: "input: Samsung Galaxy A04 có giá bao nhiêu?" },
      {
        text: "output: 1.990.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfb`",
      },
      { text: "input: realme C30s 2GB/32GB có giá bao nhiêu?" },
      {
        text: "output: Giá của realme C30s 2GB/32GB là 1.750.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      { text: "input: realme C30s 2GB/32GB có những màu sắc nào?" },
      {
        text: "output: realme C30s 2GB/32GB có 2 màu sắc: Xanh và Đen. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      {
        text: "input: Màn hình của realme C30s 2GB/32GB có kích thước bao nhiêu?",
      },
      {
        text: "output: Màn hình của realme C30s 2GB/32GB có kích thước 6,5 inch. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      {
        text: "input: Độ phân giải màn hình của realme C30s 2GB/32GB là bao nhiêu?",
      },
      {
        text: "output: Độ phân giải màn hình của realme C30s 2GB/32GB là HD+ (720 x 1600 Pixels). Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      { text: "input: Dung lượng pin của realme C30s 2GB/32GB là bao nhiêu?" },
      {
        text: "output: Dung lượng pin của realme C30s 2GB/32GB là 5000mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      {
        text: "input: realme C30s 2GB/32GB có những tính năng chụp ảnh nổi bật nào?",
      },
      {
        text: "output: realme C30s 2GB/32GB có những tính năng chụp ảnh nổi bật như: Chụp ban đêm, Bộ lọc màu, HDR, Xóa phông. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      { text: "input: realme C30s 2GB/32GB sử dụng loại chip nào?" },
      {
        text: "output: realme C30s 2GB/32GB sử dụng chip Unisoc SC9863A1 8 nhân. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      {
        text: "input: realme C30s 2GB/32GB có thể tải được những loại ứng dụng nào?",
      },
      {
        text: "output: realme C30s 2GB/32GB có thể tải được các ứng dụng cơ bản, không tải được ứng dụng nặng. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      { text: "input: realme C30s 2GB/32GB phù hợp với đối tượng nào?" },
      {
        text: "output: realme C30s 2GB/32GB phù hợp với những người không có nhu cầu sử dụng điện thoại cho nhiều tác vụ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfc`",
      },
      { text: "input: Nokia 8210 4G - Chính hãng có giá bao nhiêu?" },
      {
        text: "output: Giá của Nokia 8210 4G - Chính hãng là 1.490.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Màn hình của Nokia 8210 4G - Chính hãng có kích thước bao nhiêu?",
      },
      {
        text: "output: Màn hình của Nokia 8210 4G - Chính hãng có kích thước 2,8 inch. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      { text: "input: Nokia 8210 4G - Chính hãng sử dụng loại màn hình nào?" },
      {
        text: "output: Nokia 8210 4G - Chính hãng sử dụng màn hình QVGA. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      { text: "input: Nokia 8210 4G - Chính hãng hỗ trợ kết nối 4G không?" },
      {
        text: "output: Có, Nokia 8210 4G - Chính hãng hỗ trợ kết nối mạng 4G LTE. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Bluetooth của Nokia 8210 4G - Chính hãng có phiên bản nào?",
      },
      {
        text: "output: Nokia 8210 4G - Chính hãng hỗ trợ Bluetooth 5.0. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Nokia 8210 4G - Chính hãng có dung lượng pin bao nhiêu?",
      },
      {
        text: "output: Nokia 8210 4G - Chính hãng có viên pin có dung lượng hoạt động liên tục lên tới 6 giờ ở chế độ 4G. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Thời gian chờ của Nokia 8210 4G - Chính hãng là bao nhiêu?",
      },
      {
        text: "output: Thời gian chờ của Nokia 8210 4G - Chính hãng lên tới 20 ngày. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      { text: "input: Nokia 8210 4G - Chính hãng có bộ nhớ trong bao nhiêu?" },
      {
        text: "output: Nokia 8210 4G - Chính hãng có bộ nhớ trong 32GB. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Nokia 8210 4G - Chính hãng có hỗ trợ jack cắm tai nghe không?",
      },
      {
        text: "output: Có, Nokia 8210 4G - Chính hãng có hỗ trợ jack cắm tai nghe. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      {
        text: "input: Kích thước của Nokia 8210 4G - Chính hãng là bao nhiêu?",
      },
      {
        text: "output: Nokia 8210 4G - Chính hãng có kích thước 131,3 x 56,2 x 13,8 mm. Theo dõi sản phẩm `6572e866fd97ccc315eaddfd`",
      },
      { text: "input: Điện thoại Itel A26 - Chính hãng có bao nhiêu màu sắc?" },
      {
        text: "output: Điện thoại Itel A26 - Chính hãng có 3 màu sắc: xanh lá, xanh dương và tím. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Hệ điều hành của `Điện thoại Itel A26 - Chính hãng` là gì?",
      },
      {
        text: "output: Hệ điều hành của Điện thoại Itel A26 - Chính hãng là Android 10. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Có thể chụp ảnh xóa phông bằng `Điện thoại Itel A26 - Chính hãng` không?",
      },
      {
        text: "output: Có, Điện thoại Itel A26 - Chính hãng có tính năng chụp bokeh hỗ trợ xóa phông. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Camera trước của `Điện thoại Itel A26 - Chính hãng` có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Camera trước của Điện thoại Itel A26 - Chính hãng có độ phân giải 2MP. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Dung lượng pin của `Điện thoại Itel A26 - Chính hãng` là bao nhiêu?",
      },
      {
        text: "output: Dung lượng pin của Điện thoại Itel A26 - Chính hãng là 3020mAh. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Bộ vi xử lý của `Điện thoại Itel A26 - Chính hãng` có tốc độ xung nhịp bao nhiêu?",
      },
      {
        text: "output: Bộ vi xử lý của Điện thoại Itel A26 - Chính hãng có tốc độ xung nhịp 1.4 GHz. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: `Điện thoại Itel A26 - Chính hãng` hỗ trợ kết nối mạng gì?",
      },
      {
        text: "output: Điện thoại Itel A26 - Chính hãng hỗ trợ kết nối mạng 4G. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Màn hình của `Điện thoại Itel A26 - Chính hãng` có độ phân giải bao nhiêu?",
      },
      {
        text: "output: Màn hình của Điện thoại Itel A26 - Chính hãng có độ phân giải chuẩn HD+ (720 x 1520 pixels). Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: `Điện thoại Itel A26 - Chính hãng` có khả năng quay video không?",
      },
      {
        text: "output: Điện thoại Itel A26 - Chính hãng có khả năng quay video. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      {
        text: "input: Giá bán của `Điện thoại Itel A26 - Chính hãng` là bao nhiêu?",
      },
      {
        text: "output: Giá bán của Điện thoại Itel A26 - Chính hãng là 1.290.000 VNĐ. Theo dõi sản phẩm `6572e866fd97ccc315eaddfe`",
      },
      { text: `input: ${prompt}` },
      { text: "output: " },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
      const response = result.response;

      await Message.create({
        user: req.user._id,
        typeUser: "bot",
        typeMessage: "text",
        content: response?.text(),
        startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
      });

      res.json(response);
    } catch (e) {
      await Message.create({
        user: req.user._id,
        typeUser: "bot",
        typeMessage: "text",
        content: "...",
        startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
      });

      res.json({});
    }
  });

  //  [ GET - ROUTE: api/user/]
  getMessage = asyncHandler(async (req, res) => {
    const message = await Message.find({ user: req.user._id });
    if (message) {
      res.json(message);
    } else {
      res.status(404);
      throw new Error("User does not exist!");
    }
  });
}

module.exports = new MessageController();
