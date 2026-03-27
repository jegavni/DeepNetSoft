const Secondary = () =>{
  return (
<div className="max-w-5xl mx-auto px-4 py-10">

  {/* APPETIZERS SECTION */}
  <div className="border border-yellow-600 p-6 relative bg-black">

    {/* Title */}
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-red-500 tracking-wide">
        APPETIZERS
      </h2>
    </div>

    {/* Items */}
    <div className="space-y-4 text-gray-300">

      <div className="flex justify-between border-b border-dotted border-gray-600 pb-1">
        <span>Fire Cracker Salmon</span>
        <span>$16</span>
      </div>

      <p className="text-sm text-gray-500">
        Broiled Cajun salmon bites topped with bang bang sauce
      </p>

      <div className="flex justify-between border-b border-dotted border-gray-600 pb-1">
        <span>Lamb Chops</span>
        <span>$26</span>
      </div>

      <p className="text-sm text-gray-500">
        Garlic rosemary marinated lamb chops
      </p>

      <div className="flex justify-between border-b border-dotted border-gray-600 pb-1">
        <span>Fried Red Snapper Bites</span>
        <span>$18</span>
      </div>

      <p className="text-sm text-gray-500">
        Deep fried snapper with Cajun remoulade
      </p>
    </div>
  </div>

  {/*  SALADS SECTION */}
  <div className="mt-10 border border-gray-700 p-6 bg-black">

    <div className="mb-6">
      <h2 className="text-2xl font-bold bg-red-500 inline-block px-4 py-1">
        SALADS
      </h2>
      <p className="text-xs text-gray-400 mt-1">
        Option to add protein
      </p>
    </div>

    <div className="space-y-4 text-gray-300">

      <div className="flex justify-between border-b border-dotted border-gray-600 pb-1">
        <span>House Salad with Beans</span>
        <span>$06</span>
      </div>

      <div className="flex justify-between border-b border-dotted border-gray-600 pb-1">
        <span>Caesar Salad</span>
        <span>$08</span>
      </div>

    </div>
  </div>

</div>
    );  
}


export default Secondary;