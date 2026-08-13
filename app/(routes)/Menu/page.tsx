import Nanvar from "@/components/nanvar";
import { div } from "framer-motion/client";
import React from "react";
import TransitionPage from "@/components/transition-page";
import CoverParticles from "@/components/cover-particles";

  const Menu= () => {


  return (
  
    <div className="bg-gradient-custom" style={{ background: "linear-gradient(90.21deg, rgba(9, 255, 0, 0.536) -5.91%, rgba(242, 255, 0, 0.596) 111.58%)" }}>
      <TransitionPage />
      
      <CoverParticles  />
 
 

      <Nanvar />
      
    </div>
    
  );
};

export default Menu
