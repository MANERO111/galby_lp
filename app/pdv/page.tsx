import Image from "next/image";
import ContactFormSection from "@/components/ContactFormSection";

export default function pdvPage() {
    return (
        <main className="min-h-screen bg-[#01184e] pb-32">
            <ContactFormSection />
            <div className=" md:w-[75%] w-full mx-auto flex flex-col items-center justify-center">
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_01.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_02.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_03.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_04.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_05.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/pdv/images/lp-pdv-solaire_06.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>
        </main>
    );
}