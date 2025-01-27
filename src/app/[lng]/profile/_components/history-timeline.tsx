import React from "react";

const HistoryTimeline = () => {
  const events = [
    { year: 2015, description: "New Constitution of Nepal 2015" },
    { year: 2017, description: "Formation of Likhu Pike Rural Municipality" },
    { year: 2021, description: "Population Census of Nepal 2021" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          History Timeline
        </h2>
        <div className="relative">
          <div className="border-l-2 border-green-600 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="w-1/2 text-right pr-8">
                  <h3 className="text-xl font-bold">{event.year}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-green-600 w-4 h-4 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
