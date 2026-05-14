import Image from "next/image";
import ContactFormSection from "@/components/ContactFormSection";

export default function magiclearPage() {
    return (
        <main className="min-h-screen bg-white pb-32">
            <ContactFormSection />
            <div className=" md:w-[75%] w-full mx-auto flex flex-col items-center justify-center">
                <Image
                    src="/img/magiclear/images/lp-magiclear_01.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/magiclear/images/lp-magiclear_02.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/magiclear/images/lp-magiclear_03.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/magiclear/images/lp-magiclear_04.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/magiclear/images/lp-magiclear_05.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                <Image
                    src="/img/magiclear/images/lp-magiclear_06.png"
                    alt="hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>
        </main>
    );
}