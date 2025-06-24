import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Dagu Blog website</h1>
      <Image src={'@/images/dagu-logo.png'} alt="dagu-logo"/>
    </div>
  );
}
