import Link from "next/link";

export default function Home() {
  return (
    // <div className="bg-black bg-cover bg-center bg-[url('/images/home-img.jpg')]">
    //   <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
    //     <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
    //       <h1>NewsVibe</h1>
    //       <p>Hot News, Cool Reads — All in One Place. Curated for curious minds</p>
    //     </div>
    //   </main>
    // </div>

    <div className="bg-black bg-cover bg-center bg-[url('/images/home-img.jpg')]">
      <main className="flex items-center justify-center text-center min-h-dvh px-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 sm:p-12 rounded-2xl text-white shadow-2xl w-full max-w-xl space-y-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-cyan-400 drop-shadow-[0_1px_8px_rgba(34,211,238,0.6)]">
            NewsVibe
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
            ⚡ Hot News. Cool Reads. <br />
            Curated for <span className="text-pink-400 font-semibold">curious minds</span>. Built for the bold.
          </p>
          <button className="mt-4 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition shadow-md hover:shadow-lg">
            Explore Now
          </button>
        </div>
      </main>
    </div>


  )
}
