// import React from "react";

// const SocialFeeds = () => {
//   return (
//     <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[4rem]">
//       {/* YouTube Embed */}
//       <div className="w-full">
//         <iframe
//           className="w-full h-64 rounded-lg shadow-lg"
//           src="https://www.youtube.com/embed/NqTg6E2a4BM"
//           title="YouTube video"
//           allowFullScreen
//         ></iframe>
//       </div>

//       {/* Facebook Embed */}
//       <div className="flex flex-col">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <span className="text-blue-600 text-xl">📘</span> Facebook Posts
//         </h2>
//         <div
//           className="mt-2 w-full h-40 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center"
//         >
//           <iframe
//             className="w-full h-full rounded-lg"
//             src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebook&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
//             title="Facebook Page"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialFeeds;

import ppk_activities from "../../assets/images/PPKI activity 1.jpg";

import React from "react";
import { ChevronRight, Facebook, Calendar, Star } from "lucide-react";
export const SocialFeeds = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const MessageCircle = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    );
  };

  const posts = [
    {
      id: 1,
      title: data.updates[0].imageLabel,
      content: data.updates[0].details,
      image: ppk_activities,
      date: formatDate(data.updates[0].date), // Format the date
      likes: data.updates[0].likes,
      comments: data.updates[0].comments,
    },
    {
      id: 2,
      title: data.updates[1].imageLabel,
      content: data.updates[1].details,
      image: ppk_activities,
      date: formatDate(data.updates[1].date), // Format the date
      likes: data.updates[1].likes,
      comments: data.updates[1].comments,
    },
    {
      id: 3,
      title: data.updates[2].imageLabel,
      content: data.updates[2].details,
      image: ppk_activities,
      date: formatDate(data.updates[2].date), // Format the date
      likes: data.updates[2].likes,
      comments: data.updates[2].comments,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">{data.title}</h2>
            <p className="text-gray-600 mt-2">{data.subtitle}</p>
          </div>
          <div className="hidden md:block">
            <a
              href="https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Follow Us on Facebook
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {post.likes} Likes
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                      {post.comments} Comments
                    </span>
                  </div>
                  <a
                    href={`https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr`}
                    className="text-blue-900 hover:text-yellow-600 font-medium text-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr"
            className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            View All Updates
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
