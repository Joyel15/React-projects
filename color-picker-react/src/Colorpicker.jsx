import React, { useState } from "react";

function Colorpicker() {
  const [color, setColor] = useState("rgb(0,0,0)");

function handleColorChange(event){
  setColor(event.target.value);
}

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-red-500 font-semibold m-4">COLOR PICKER</h1>
      <div className="w-[400px] h-[400px] flex justify-center items-center rounded-2xl mt-3 transition-all" 
      style={{ backgroundColor: color }}>
        <p className="text-2xl text-white"> Selected Color: {color}</p>
      </div>
      <label className="text-lg font-bold mt-4">Select a Color:</label>
      <input type="color" value={color} onChange={handleColorChange} className="w-[80px] h-[60px] rounded-xl border-2 p-1" />
    </div>
  );
}

export default Colorpicker;
