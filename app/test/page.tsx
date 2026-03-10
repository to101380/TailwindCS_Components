import Image from "next/image";
import AppleNavbar from "@/components/navbar";



function Page() {
    return (
        <main className="min-h-[200vh] bg-white" style={{
            backgroundImage: "url('https://dribs-drabs.com/wp-content/uploads/2025/12/00-8.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
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
        <Page />
    );
}
