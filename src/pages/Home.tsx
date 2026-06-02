import { useState, useEffect } from "react";
import HeaderRow from "../components/header/HeaderRow";
import Hero from "../components/hero/Hero";
import Placeholder from "../components/Placeholder";

function Home() {
  const [isHeroExited, setIsHeroExited] = useState(false);

  useEffect(() => {
    if (!isHeroExited) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        e.preventDefault();
        setIsHeroExited(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isHeroExited]);

  return (
    <>
      <Placeholder />
      <Hero isExited={isHeroExited} onExitChange={setIsHeroExited} />
      {isHeroExited && <HeaderRow />}
    </>
  );
}

export default Home;
