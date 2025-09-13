import React, { useState } from "react";

export const HeaderExt = () => {
  return (
    <div className="bg-red-600 text-white flex flex-col justify-center items-center px-4 py-4 min-w-[250px]">
      <div className="text-xs text-center leading-tight">
        <div>A journal of the</div>
        <div className="font-medium">Econometric Society</div>
      </div>
    </div>
  );
};

const Logo = () => (
  <div className="bg-red-600 text-white flex flex-col justify-center items-center px-6 py-4 min-w-[250px]">
    <div className="text-6xl font-bold leading-none mb-2">TE</div>
    <div className="text-xs text-center">
      <div>ISSN (e) 1555-7561</div>
      <div>(print) 1933-6837</div>
    </div>
  </div>
);

export default Logo;

// Header Component
// const Header = () => (
//   <div className="bg-red-600 text-white p-4 flex items-center justify-between">
//     <div className="flex items-center space-x-4">
//       <div className="text-6xl font-bold">TE</div>
//       <div className="text-xs">
//         <div>ISSN (e) 1555-7561</div>
//         <div>(print) 1933-6837</div>
//       </div>
//     </div>
//     <div className="text-center flex-1">
//       <h1 className="text-3xl font-bold text-red-100">Theoretical Economics</h1>
//       <p className="text-red-100 text-sm">
//         An open-access journal in economic theory
//       </p>
//     </div>
//     <div className="text-xs text-right text-red-100">
//       <div>A journal of the</div>
//       <div>Econometric Society</div>
//     </div>
//   </div>
// );

// export default Header;
