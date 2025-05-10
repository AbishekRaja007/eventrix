import React from "react";
import ab from "../../assets/images/ab.jpg"


const VendorDetail = () => {
  return (
    <div className="w-full bg-stone-">
      {/* Top Image + Price + Contact Card */}
      <div className="flex flex-col lg:flex-row gap-x-1 w-full max-w-7xl mx-auto mt-6">
        {/* Left Image Section */}
        <div className="lg:w-[750px] relative left-2">
          <img
            src={ab}
            alt="Venue"
            className="w-full h-[400px] object-cover "
          />
          <div className="absolute left-9 bg-white px-4 py-4 shadow-md flex items-center justify-between w-[90%] top-[350px]">
            <div>
              <h2 className="font-bold text-xl">Vishalgarh Farms</h2>
              <p className="text-gray-600 text-sm">Sohna Road, Gurgaon (View on Map)</p>
              <p className="text-gray-500 text-sm">Near, Teekli, Garat Pur Bas Village...</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 ">5.0</span>
              <span className="text-gray-600 text-sm">3 reviews</span>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24  bg-white border">
            <div className="flex  gap-4">
              <button className="px-6 py-2 ext-gray-700 rounded">Photos</button>
              <button className="px-6 py-2  text-gray-700 rounded">About</button>
              <button className="px-6 py-2  text-gray-700 rounded">Reviews</button>
            </div>
          </div>
{/* Additoonal photos Section */}
<div className="max-w-7xl mx-auto mt-8 p-4 border">
  <div className="flex items-center justify-between mb-4 ">
    <div className="space-x-4 text-base font-semibold text-gray-700 ">
      <h2 className="border-b-2 border-pink-600 pb-1">Additoonal photos</h2>
    </div>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {[...Array(12)].map((_, i) => (
      <img
        key={i}
        src={`https://via.placeholder.com/150?text=Image+${i + 1}`}
        alt={`Portfolio ${i + 1}`}
        className="rounded"
      />
    ))}
  </div>
  <div className="text-center mt-4">
    
  </div>
</div>
        </div>

        {/* Right Contact Card */}
        <div className="lg:w-2/5 w-full p-4 lg:pr-6 bg-white space-y-6">
          {/* Price Section */}
          <div className="p-4 bg-white  border">
            <div className="text-right text-sm text-gray-600 mb-2">Starting Price</div>
            <div className="space-y-1">
              <div className="flex justify-between text-red-600 font-semibold">
                <span>₹ 1,500 per plate</span>
              
              </div>
              <div className="flex justify-between text-pink-600 font-semibold">
                <span>₹ 1,700 per plate</span>
                
              </div>
            </div>
          
          </div>

          {/* Form Section */}
          <div className="p-4 bg-white  border">
            <form className="space-y-2 text-sm">

            <button className="w-full bg-pink-600 text-white py-2 rounded mt-4">Send Message</button>
            <button className="w-full border border-green-600 text-green-600 py-2 rounded mt-2">
              View Contact
            </button>
              <input className="w-full border p-2 rounded" placeholder="Full name*" required />
              <div className="flex gap-2">
                <span className="flex items-center border p-2 rounded w-1/4">+91</span>
                <input
                  className="w-3/4 border p-2 rounded"
                  placeholder="Phone number"
                />
              </div>
              <input className="w-full border p-2 rounded" placeholder="Email address" />
              <input className="w-full border p-2 rounded" placeholder="Function date*" />
              <input className="w-full border p-2 rounded" placeholder="No of guests (min 50)" />
              <input className="w-full border p-2 rounded" placeholder="No of rooms" />
             
              <button className="w-full bg-pink-600 text-white py-2 rounded">
                Check Availability & Prices
              </button>
            
            </form>
          </div>
        </div>

        
      </div>
{/* Description Section */}
<div className="container mx-auto bg-white rounded-lg shadow-sm p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">
    About Flora Green Banquet - Wedding Venues, Palam Vihar, Gurgaon
  </h2>
  <p className="text-gray-700 mb-4">
    Flora Green Banquet is a stunning banquet hall/wedding venue based in Palam Vihar, Gurgaon...
  </p>

  <div className="space-y-4 text-gray-700">
    <div>
      <h3 className="font-semibold">Space Available In Flora Green Banquet</h3>
      <p>The venue has a banquet hall where you can hold your wedding functions...</p>
    </div>

    <div>
      <h3 className="font-semibold">Capacity Of Flora Green Banquet</h3>
      <p>The venue has a seating capacity of 300 and floating up to 500.</p>
    </div>

    <div>
      <h3 className="font-semibold">Cuisines Offered In Flora Green Banquet</h3>
      <p>They only offer in-house catering...</p>
    </div>

    <div>
      <h3 className="font-semibold">Facilities Provided By Flora Green Banquet</h3>
      <ul className="list-disc list-inside">
        <li>In-house catering only</li>
        <li>No alcohol allowed (outside permitted)</li>
        <li>In-house decor</li>
        <li>In-house DJ available</li>
        <li>Sufficient parking</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold">Location Of Flora Green Banquet</h3>
      <p>Located in C1 Palam Vihar, Dharam Colony, Gurgaon.</p>
    </div>

    <div>
      <h3 className="font-semibold">Flora Green Banquet Wedding Venue Cost</h3>
      <p>The price per plate is listed above. Contact them directly for more info.</p>
    </div>

    <div>
      <h3 className="font-semibold">Photos Of Flora Green Banquet</h3>
      <p>Check out their profile for visual details of the venue.</p>
    </div>
  </div>

  {/* Quick Info Grid */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mt-6 border-t pt-4">
    <p><span className="font-semibold">Been on WedMeGood:</span> 1 year 7 months</p>
    <p><span className="font-semibold">Room Count:</span> 6 Rooms</p>
    <p><span className="font-semibold">Catering policy:</span> Inhouse only</p>
    <p><span className="font-semibold">Decor Policy:</span> Inhouse decor</p>
    <p><span className="font-semibold">Space:</span> Indoor, Outdoor</p>
    <p><span className="font-semibold">Small Party Venue:</span> Less than 50 Pax not allowed</p>
    <p><span className="font-semibold">Features:</span> Parking, Small Function Venue</p>
    <p><span className="font-semibold">Parking:</span> Sufficient parking available</p>
    <p><span className="font-semibold">Outside Alcohol:</span> Allowed</p>
    <p><span className="font-semibold">DJ Policy:</span> In-house & Outside DJ permitted</p>
  </div>
</div>

{/* Review Section */}
<div className="container mx-auto bg-white rounded-lg shadow-sm p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Reviews for Flora Green Banquet</h2>
  
  <div className="flex flex-col md:flex-row gap-6">
    {/* Rating Breakdown */}
    <div className="w-full md:w-1/3">
      <h3 className="text-sm font-semibold text-gray-700">Rating Breakdown</h3>
      <div className="w-full border-r p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Rating Distribution</h3>
        <div className="flex items-center justify-between">
          <span className="text-green-600 font-bold flex items-center gap-1">
            <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded-sm">★</span> 5.0
          </span>
        </div>
        {[5, 4, 3, 2, 1].map((rating, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            <span>{rating} ★</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded">
              {rating === 5 && <div className="w-full h-2 bg-green-500 rounded"></div>}
            </div>
            <span>{rating === 5 ? "1 review" : "0 reviews"}</span>
          </div>
        ))}
        <p className="text-xs text-gray-500 pt-2">Last Review Updated on 17 Sep 2024</p>
      </div>
    </div>

    {/* Submit Review Section */}
    <div className="w-full md:w-2/3">
      <h3 className="font-semibold text-gray-700">Submit Your Review</h3>
      <div className="p-4">
        <label className="block mt-2 text-sm font-medium">Rate Vendor*</label>
        <div className="flex gap-1 mt-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <input key={i} type="checkbox" className="w-4 h-4" />
          ))}
        </div>
        <textarea
          className="mt-4 w-full border rounded p-2 text-sm"
          rows={4}
          placeholder="Write your review..."
        ></textarea>
        <input
          type="text"
          className="w-full mt-2 border rounded p-2 text-sm"
          placeholder="How much did you spend on this vendor?"
        />
        <div className="flex items-center gap-2 mt-4">
          <button className="border px-4 py-2 text-sm">Add Photos</button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded text-sm">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Existing Reviews Section */}
  <div className="border-t pt-4">
    <h3 className="font-semibold text-gray-700 mb-4">Customer Reviews</h3>
    <div className="border-t p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <div className="text-sm font-medium">Sanjay</div>
        <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded-sm">★ 5.0</span>
        <span className="text-xs text-gray-500">Reviewed 7 months ago</span>
      </div>
      <p className="text-sm text-gray-700">
        I recently visited a wedding reception at the Flora green banquet and pleased to share my experience.
        The location is conveniently situated with ample parking, and the staff were active and professional 
        attentive throughout the event. Catering was a highlight with guests praising and presentation of the 
        dishes and their memorable atmosphere. <span className="text-pink-600">Read more</span>
      </p>
      <div>
        <h4 className="text-sm font-semibold">Recommended for:</h4>
        <div className="flex items-center gap-2 mt-1">
          <img
            src="https://cdn0.weddingwire.in/assets/img/review-badges/amazing-food.svg"
            alt="Amazing Food"
            className="w-8 h-8"
          />
          <span className="text-sm font-medium">Amazing Food</span>
        </div>
      </div>
    </div>
  </div>
</div>

      

      
    </div>
  );
};

export default VendorDetail;
