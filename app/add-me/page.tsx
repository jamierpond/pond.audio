import QRCode from "react-qr-code";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1>Jamie Pond</h1>
      <p>Scan this QR code to add add my contact details!</p>
      <QRCode className="mt-8" value="https://pond.audio/jamie.vcf" />
      <p className="mt-8">Or, add me on:</p>
      <a href="https://pond.audio/github">
        <u>GitHub</u>
      </a>
      <a href="https://pond.audio/linkedin">
        <u>LinkedIn</u>
      </a>
      <a href="https://pond.audio/x">
        <u>X</u>
      </a>
      <a href="https://www.instagram.com/jamierpond">
        <u>Instagram</u>
      </a>
    </div>
  );
}
