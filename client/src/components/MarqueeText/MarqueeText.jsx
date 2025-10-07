export const MarqueeText = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-yellow-400 text-blue-900 py-2 px-4">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="mr-8 font-semibold">📢 No announcements available.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-400 text-blue-900 py-2 px-4">
      <div className="overflow-hidden whitespace-nowrap">
        {/* First Marquee */}
        <div className="inline-block animate-marquee">
          {data.map((item, index) => (
            <span key={`marquee1-${index}`} className="mr-8 font-semibold">
              {item}
            </span>
          ))}
        </div>

        {/* Second Marquee */}
        <div className="inline-block animate-marquee2">
          {data.map((item, index) => (
            <span key={`marquee2-${index}`} className="mr-8 font-semibold">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};