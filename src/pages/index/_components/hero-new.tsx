import { FC, useState } from "react";
import { Typewriter, useTypewriter } from "react-simple-typewriter";

import { IconStar1, IconStar2, IconStar3 } from "@/assets/icons";
import { container } from "@/styles/variants";

type HeroProps = {};

/**
 * This is the new Hero.
 */
export const Hero: FC<HeroProps> = (_props) => {
  const [typedWord, setTypedWord] = useState<"Mariale" | "Transformateur">("Mariale");

  const [typewriter, { isDelay: _isDelay, isDelete: _isDelete }] = useTypewriter({
    words: ["Mariale", "Transformateur"],
    delaySpeed: 5000,
    loop: true,
    onDelay() {
      setTypedWord(typewriter as typeof typedWord);
    },
  });

  return (
    <div className="relative h-screen flex flex-col gap-y-6 item-center justify-center bg-[#E6E6FA] pt-12">
      {/* Icons */}
      <IconStar1 className="absolute z-20 top-20 right-10 w-[75px] md:top-36 md:right-28 md:w-[120px]" />
      <IconStar2 className="absolute z-20 w-[75px] bottom-44 right-44 hidden md:block" />
      <IconStar3 className="absolute bottom-20 left-8 z-20 w-[56px] md:w-[100px] md:bottom-40 md:left-40" />
      <div className="absolute top-32 right-10 w-[95px] h-[95px] rounded-full bg-[#040593] opacity-75 blur-3xl z-0 md:w-[460px] md:h-[460px] md:blur-[150px] md:top-6 md:opacity-50" />
      <div className="absolute bottom-32 left-4 w-[155px] h-[155px] rounded-full bg-[#B99608] opacity-75 blur-3xl z-0 md:w-[360px] md:h-[360px] md:blur-[120px] md:bottom-10 md:opacity-50" />

      {/* Backdrop */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/*  Background */}
        <div className="absolute inset-0 bg-primary-500/70 z-10" />
        {/* Collage */}
        <div
          style={{
            backgroundImage: `url(/hero/1.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=""
        />
        <div
          style={{
            backgroundImage: `url(/hero/2.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=""
        />
        <div
          style={{
            backgroundImage: `url(/hero/3.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=""
        />
        <div
          style={{
            backgroundImage: `url(/hero/4.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=""
        />
        <div
          style={{
            backgroundImage: `url(/hero/5.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" col-span-2"
        />
      </div>

      {/* Content */}
      <div className={container({ class: "relative flex flex-col gap-y-2 z-10" })}>
        <p className="text-primary-200 text-center text-sm">
          Home to <b>Mariale</b> and <b>Transformateur</b>
        </p>
        <p className="text-primary-100 text-center leading-[42px] text-[28px] font-[300] z-10 px-5 md:text-[48px] md:leading-[64px] overflow-hidden">
          Welcome to <span className="font-bold text-secondary-400">{typewriter}!</span>
        </p>
        <p className="text-center text-primary-100">
          <span>The official </span>

          <span className="text-secondary-400 font-medium">
            {typedWord === "Mariale" ? (
              <Typewriter
                words={["student publication", ""]}
                cursor
                delaySpeed={3500} // Arbitrary
                typeSpeed={50} // Arbitrary
                deleteSpeed={30} // Arbitrary
              />
            ) : null}
            {typedWord === "Transformateur" ? (
              <Typewriter
                words={["research journal", ""]}
                cursor
                delaySpeed={4000} // Arbitrary
                typeSpeed={50} // Arbitrary
                deleteSpeed={50} // Arbitrary
              />
            ) : null}
          </span>
          <span>of Assumption Iloilo</span>

          <br />
        </p>

        <img src="/logo.png" alt="Logo" height={100} width={100} className="mx-auto mb-14" />
      </div>
    </div>
  );
};
