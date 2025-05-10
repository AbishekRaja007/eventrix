import React from "react";
import HomeSection1 from "../../components/home_components/HomeSection1";
import HomeSection2 from "../../components/home_components/HomeSection2";
import HomeSection3 from "../../components/home_components/HomeSection3";
import HomeSection4 from "../../components/home_components/HomeSection4";
import HomeSection5 from "../../components/home_components/HomeSection5";
import HomeSection6 from "../../components/home_components/Homesection6";

import HomeSection8 from "../../components/home_components/HomeSection8";

import Header from "../../components/header_components/Header";

const Homepage = () => {
  return (
  <div className="relative ">
      
      <Header />


        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
        <HomeSection6 />
        
        <HomeSection8 />
       
    
    </div>
  );
};

export default Homepage;
