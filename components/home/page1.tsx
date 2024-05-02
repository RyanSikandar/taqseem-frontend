import React from "react";
import Link from "next/link"; // Import the Link component

const Page1 = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center h-screen px-[2%]">
      <img src="path/to/your/image.jpg" alt="Image" />
      <h1 className="text-center font-semibold text-2xl">
        Where Trust Meets <br />
        <span style={{ color: "#F7AB0A" }}>Innovation</span>
      </h1>
      <p>
        Embark on a journey of seamless and unwavering security with Taqseem.
      </p>
      <div className="fixed bottom-0 right-0 left-0 flex justify-between p-8">
      <Link
          href="/login"
          className="bg-background hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full"
        >
          Skip
        </Link>
        <Link
          href="/page2"
          className="bg-zinc-800 hover:bg-yellow-900 text-white font-bold py-2 px-8 rounded-full"
        >
          Next
        </Link>
        
      </div>
    </div>
  );
};

export default Page1;
