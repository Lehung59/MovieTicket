import QRCode from "qrcode-generator";

export default function QRCodeGenerator({ data }) {
  // Tạo mã QR với dữ liệu đã cho
  const qr = QRCode(0, "L");
  qr.addData(data);
  qr.make();
  const qrImage = qr.createImgTag(7); // ukuran 4x4

  // Hiển thị mã QR thành phần tử HTML
  return <div dangerouslySetInnerHTML={{ __html: qrImage }} />;
}
