import Image from "next/image";
import ContactFormSection from "@/components/ContactFormSection";

export default function HydraskinPage() {
    return (
        <main className="min-h-screen bg-white pb-32">
            <ContactFormSection />
            <div className=" md:w-[75%] w-full mx-auto flex flex-col items-center justify-center">
                <Image
                    src="/img/hydraskin/images/lp-hydraskin-_01.png"
                    loading="eager"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    loading="eager"
                    src="/img/hydraskin/images/lp-hydraskin-_02.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/hydraskin/images/lp-hydraskin-_03.png"
                    loading="eager"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/hydraskin/images/lp-hydraskin-_04.png"
                    loading="eager"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/hydraskin/images/lp-hydraskin-_05.png"
                    loading="eager"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/hydraskin/images/lp-hydraskin-_06.png"
                    loading="eager"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>
        </main>
    );
}