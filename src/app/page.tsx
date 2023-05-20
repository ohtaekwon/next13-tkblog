import Image from "next/image";
import blogs from "@/lib/data";

export default function Home() {
  return (
    <main className="">
      <div>
        {blogs.map((blog, index) => (
          <div></div>
        ))}
      </div>
    </main>
  );
}
