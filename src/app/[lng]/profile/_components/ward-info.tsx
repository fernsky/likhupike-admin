import React from "react";

const WardInfo = () => {
  const wards = [
    { number: 1, name: "Ward 1", description: "Description for Ward 1" },
    { number: 2, name: "Ward 2", description: "Description for Ward 2" },
    { number: 3, name: "Ward 3", description: "Description for Ward 3" },
    { number: 4, name: "Ward 4", description: "Description for Ward 4" },
    { number: 5, name: "Ward 5", description: "Description for Ward 5" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Wards Information
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wards.map((ward) => (
            <div
              key={ward.number}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2">{ward.name}</h3>
              <p className="text-gray-600">{ward.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WardInfo;
