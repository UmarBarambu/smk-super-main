export const SchoolStats = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <p className="text-blue-100 mt-2">{data.subtitle}</p>
        </div>

        {/* Dynamically Render Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {data.cards.map((card, index) => (
            <div key={index} className="p-6 rounded-lg bg-blue-800 shadow-lg">
              <div className="text-yellow-400 text-4xl font-bold mb-2">
                {card.percentage}
              </div>
              <div className="text-lg font-medium">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
