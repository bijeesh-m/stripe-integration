import React from "react";

const ScrollPage = () => {
    return (
        <div className="">
            <div>
                <a href="#about">About section</a>
            </div>
            <div className=" h-screen"></div>
            <div id="about" className=" h-screen bg-amber-500 ">
                About Section
            </div>
        </div>
    );
};

export default ScrollPage;
