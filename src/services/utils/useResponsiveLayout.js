import { useEffect, useState } from "react";

function useResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const handler = (e) => setIsMobile(e.matches);

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
export default useResponsiveLayout;
