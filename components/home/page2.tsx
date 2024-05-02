import React from "react";
import Link from "next/link"; // Import the Link component

const Page2 = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center h-screen px-[2%]">
      <img src="path/to/your/image.jpg" alt="Image" />
      <h1 className="text-center font-semibold text-2xl">
      Help the  <span style={{ color: "#F7AB0A" }}>hands</span>  of the need
       
      </h1>
      <p>
        Embark on a journey of seamless and unwavering security with Taqseem.
      </p>
      <div className="fixed bottom-0 w-full flex justify-between p-8">
      <Link
          href="/login"
          className="bg-zinc-800 hover:bg-[#F7AB0A]/70 w-full text-white font-bold py-2 px-4 rounded-full"
        >
          Start
        </Link>
        
      </div>
    </div>
  );
};

export default Page2;
