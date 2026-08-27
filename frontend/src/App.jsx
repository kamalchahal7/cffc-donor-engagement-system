function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-[#0f2b4c] text-white text-center py-20 px-4 relative">
        <img 
            src="https://raw.githubusercontent.com/kamalchahal7/CFFC-Donor-Engagement-System/main/backend/app/templates/logo.png" 
            alt="Canadian Food for Children" 
            className = "w-60 md:w-80 mx-auto"
          />
        <h1 className="text-5xl font-bold text-black-600 text-center py-4">
          Donation Page
        </h1>
        <h3 className="text-xl font-medium text-gray-300 py-1 text-center mb-7 md:mb-0">
          Feeding the poorest of the poor in developing countries since 1983
        </h3>
        <div className="relative md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col gap-3 justify-center mt-6 md:mt-0">
          <button
            onClick={() => navigator.clipboard.writeText("Help support Canadian Food for Children! Donate food, supplies, or funds to help families in need across 20+ developing countries: " + window.location.href).then(() => alert ('Link copied!'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
          >
            Share This Page
          </button>
          <a href="https://www.canadahelps.org/en/dn/4714" 
           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
          >Donate Now
          </a>
        </div>
      </section>
      {/* Impact Section */}
      <section className="bg-white shadow-md rounded-lg max-w-4xl mx-auto -mt-8 py-12 px-8">
        <h3 className="text-xl font-medium py-1 mb-2 text-center">
          Over the last decade, we have delivered:
        </h3>
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-10">
          <div className="text-center">
            <p className="text-4xl font-bold">2,800+</p>
            <p className="text-gray-500">Shipments</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">40,000+</p>
            <p className="text-gray-500">Metric Tonnes</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">20+</p>
            <p className="text-gray-500">Countries</p>
          </div>

          
        </div>
        <h3 className="text-l font-light py-1 mt-2 text-center">
          Including food, clothing, medical supplies, educational materials, and household goods
        </h3>
        {/* <h3 className="text-xl font-light py-1 text-center">
          These shipments would not be possible without our generous donors as:
        </h3> */}
        <h3 className="text-xl font-medium text-green-600 font-bold mt-1 -mb-4 text-center">
          97% of our monetary donations go directly towards our shipments, with the remaining 3% funding administrative costs
        </h3>
        {/* Change below to a interactive pie chart */}
        {/* <p className="text-xl font-medium py-1 text-center">
          Our latest shipments (2025) include the following countries:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-10">Angola</span>
          <span className="px-10">Cameroon</span>
          <span className="px-10">El Salvador</span>
          <span className="px-10">Ghana</span>
          <span className="px-10">Honduras</span>
          <span className="px-10">Jamaica</span>
          <span className="px-10">Liberia</span>
          <span className="px-10">Malawi</span>
          <span className="px-10">Peru</span>
          <span className="px-10">Sierra Leone</span>
          <span className="px-10">Tanzania</span>
          <span className="px-10">Zambia</span>
        </div> */}
      </section>
        
      <section className="flex flex-col md:flex-row gap-8 px-8 py-6 md:py-10 max-w-6xl mx-auto">
        <div className="flex-1">
          <h3 className="text-xl font-medium py-1 text-center">
            Kindly consider donating any of the following items:
          </h3>
          {/* What's Needed Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            {/* <h3 className="text-lg font-bold text-center mb-3">
              Stuff we always need:
            </h3> */}
            <h3 className="text-lg font-bold text-center mb-3">
              Always Needed in Any Shipment
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-gray-100 px-4 py-2 rounded-full">Cooking Oil</span>
              <span className="bg-gray-100 px-4 py-2 rounded-full">Table Salt</span>
              <span className="bg-gray-100 px-4 py-2 rounded-full">Beans</span>
              <span className="bg-gray-100 px-4 py-2 rounded-full">Canned Tomatoes</span>
              <span className="bg-gray-100 px-4 py-2 rounded-full">Rice</span>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            {/* <h3 className="text-lg font-bold text-center mb-3">
              Urgent items needed now:
            </h3> */}
            <h3 className="text-lg font-bold text-center mb-3">
              Needed for Upcoming Shipments
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-red-50 px-4 py-2 rounded-full">Fishing Equipment</span>
              <span className="bg-red-50 px-4 py-2 rounded-full">Blankets</span>
              <span className="bg-red-50 px-4 py-2 rounded-full">Hoodies</span>
              <span className="bg-red-50 px-4 py-2 rounded-full">Children's Books</span>
              <span className="bg-red-50 px-4 py-2 rounded-full">Laptops & Cell Phones</span>
            </div>
          </div>
        </div>

        {/* Monetary Donation Section */}
        <div className="flex-1">
          <h3 className="text-xl font-medium py-1 -mt-2 md:-mt-0 text-center">
            You can also support us through monetary donations:
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Credit Card/Paypal - Top Left */}
            <div className="bg-white text-center p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center">
              <h3 className="text-lg font-bold">
                Credit Card/Paypal
              </h3>
              <a href="https://www.canadahelps.org/en/dn/4714" 
              className = "inline-block mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
              >Donate Now
              </a>
            </div>

            {/* E-Transfer - Top Right */}
            <div className="bg-white text-center p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center">
              <h3 className="text-lg font-bold">
                E-Transfer to:
              </h3>
              <p className="mt-2 break-all"><a href="mailto:cffc.aasimone@yahoo.ca"
                  className="text-blue-600 text-lg underline hover:text-blue-800">
                    cffc.aasimone@yahoo.ca
                  </a>
              </p>
            </div>
            
            {/* Cheque - Bottom Left */}
            <div className="bg-white text-center p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center">
              <h3 className="text-lg font-bold">
                Cheque
              </h3>
              <p className="mt-2">Payable to Canadian Food for Children</p>
              <p className="text-gray-500 text-sm">Address: 1258 Lakeshore Rd E, Mississauga, ON L5E 1E9</p>
            </div>

            {/* Securities/Mutual Funds - Bottom Right */}
            <div className="bg-white text-center p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center">
              <h3 className="text-lg font-bold">
                Securities or Mutual Funds
              </h3>
              <a href="https://www.canadahelps.org/en/dn/45754" 
                className = "inline-block mt-2 bg-violet-500 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
                >Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      
      
      {/* Footer Section */}  
      <footer className="bg-[#0f2b4c] text-white py-8 text-center">
        <p className="text-lg">905-274-9239 | 1258 Lakeshore Rd E, Mississauga, ON L5E 1E9</p>
      <p className="text-lg mt-1">cffc.aasimone@yahoo.ca</p>
      <p className="text-sm text-gray-400 mt-4">Charitable Registration #: 118831080 RR 0001</p>
      </footer>
    </div>
  )
}

export default App