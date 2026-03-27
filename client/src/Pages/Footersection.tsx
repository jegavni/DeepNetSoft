
const FooterSection = () => {
  return (
    <div className="bg-black text-white mt-10">

      {/*  OPENING HOURS */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Left */}
          <div>
            <p className="text-yellow-400 italic text-sm">
              Be there on time
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500">
              OPENING HOURS
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm md:text-base">
            <div>
              <p className="font-semibold">MONDAY - THURSDAY</p>
              <p className="text-blue-400">12 PM – 12 AM</p>
            </div>

            <div>
              <p className="font-semibold">FRIDAY - SATURDAY</p>
              <p className="text-blue-400">12 PM – 01 AM</p>
            </div>

            <div>
              <p className="font-semibold">SUNDAY</p>
              <p className="text-blue-400">12 PM – 11 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CARDS */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Connect */}
        <div className="border border-yellow-600 rounded-xl p-6 text-center md:text-left">
          <h3 className="text-yellow-500 font-semibold mb-3">
            CONNECT WITH US
          </h3>
          <p className="text-gray-400">+91 940 061 3433</p>
          <p className="text-gray-400">info@deepnetsoft.com</p>
        </div>

        {/* Logo */}
        <div className="border border-yellow-600 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold tracking-widest text-yellow-500">
            DEEP NET SOFT
          </h2>
          <div className="flex justify-center gap-3 mt-3 text-gray-400 text-sm">
            <span>FB</span>
            <span>IG</span>
            <span>TW</span>
          </div>
        </div>

        {/* Address */}
        <div className="border border-yellow-600 rounded-xl p-6 text-center md:text-left">
          <h3 className="text-yellow-500 font-semibold mb-3">
            FIND US
          </h3>
          <p className="text-gray-400">
            First floor, Geo infopark,
          </p>
          <p className="text-gray-400">
            Infopark EXPY, Kakkanad
          </p>
        </div>
      </div>

      {/*  BOTTOM BAR */}
      <div className="bg-gray-900 mt-10 py-4 text-center text-sm text-gray-400">
        © 2026 Deepnetsoft Solutions. All rights reserved.
        <div className="mt-2 space-x-4">
          <span className="hover:text-white cursor-pointer">
            Terms & Conditions
          </span>
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;