import Image from "next/image";
import AppleNavbar from "@/components/navbar";
import PeekCarousel from "@/components/peek-carousel";
import ScrollAnimationsShowcase from "@/components/animate";


function HomePage() {
    return (
        <main className="min-h-screen bg-[#1b1b1f]">
            <PeekCarousel />
        </main>
    );
}


function Page() {
    return (
        <main className="min-h-[200vh] bg-white">
            <AppleNavbar />
            <section className="px-6 pt-28 md:pt-32" >
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold text-black">你的內容</h1>
                    <p className="mt-4 text-black/70">
                        往下滾動可以看到 navbar 高度縮小、陰影變明顯。
                    </p>
                </div>
            </section>
        </main>
    );
}

export default function Home() {
    return (

        <>
            <Page />
            <HomePage />
            <ScrollAnimationsShowcase />
        </>
    );
}
