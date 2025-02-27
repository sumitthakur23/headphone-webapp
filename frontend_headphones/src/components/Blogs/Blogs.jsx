import React from "react";
import Blog1 from "../../assets/blogs/blog1.jpg";
import Blog2 from "../../assets/blogs/blog2.jpg";
import Blog3 from "../../assets/blogs/blog3.jpg";
import Blog4 from "../../assets/blogs/blog4.jpg";
import Blog5 from "../../assets/blogs/blog5.jpeg"; // Image for the 5th blog
import Blog6 from "../../assets/blogs/blog6.jpg";  // Image for the 6th blog
import Blog7 from "../../assets/blogs/blog7.jpg";  // Image for the 7th blog
import Blog8 from "../../assets/blogs/blog8.jpg";  // Image for the 8th blog
import { UpdateFollower } from "react-mouse-follower";

const BlogsData = [
  {
    id: 1,
    title: "How These Headphones Transformed My Everyday Music Experience",
    desc: "The sound clarity and comfort have elevated my daily commute, workouts, and relaxation time. Truly a game-changer for audio lovers.",
    link: "#",
    img: Blog1,
  },
  {
    id: 2,
    title: "Why I Trust These Headphones for Studio-Level Audio Quality",
    desc: "As an audiophile, I’m amazed by the precision and richness in the sound Experience. These headphones really redefine how I experience music.",
    link: "#",
    img: Blog2,
  },
  {
    id: 3,
    title: "My Incredible Journey with the Most Comfortable Headphones Everr",
    desc: "Long hours of wear, zero discomfort these headphones fit like a dream. Perfect for work, travel, unwinding at home or any type of use.",
    link: "#",
    img: Blog3,
  },
  {
    id: 4,
    title: "The Perfect Audio Companion for My Active, Energetic Lifestyle",
    desc: "Whether running outdoors or hitting the gym, these headphones deliver top-notch performance, staying secure and sounding incredible.",
    link: "#",
    img: Blog4,
  },
  {
    id: 5,
    title: "Why These Headphones Are My Go-To for Every Commute and Adventure",
    desc: "Sleek design meets exceptional audio quality. These headphones are not just functional they’re a statement piece I proudly wear. Seamless Comfort.",
    link: "#",
    img: Blog5,
  },
  {
    id: 6,
    title: "Noise-Cancelling Magic: My Essential Travel Must-Have for Peaceful Journeys",
    desc: "The seamless pairing and marathon battery life keep me going all day long. These headphones truly prioritize convenience and quality.",
    link: "#",
    img: Blog6,
  },
  {
    id: 7,
    title: "Crystal Clear Sound for All My Virtual Meetings and the Conference Calls.",
    desc: "From flawless audio quality to a sleek design, these headphones make me feel professional and productive every single day.",
    link: "#",
    img: Blog7,
  },
  {
    id: 8,
    title: "These Headphones Keep Up with My Active Life Without Compromise",
    desc: "Flights and train rides are serene now, thanks to the noise-cancelling feature. Pure peace and great music on the go!",
    link: "#",
    img: Blog8,
  },
];

const Blogs = () => {
  return (
    <section id="blog" className="bg-green-50">
      <div className="container py-14">
        <h1 className="text-3xl font-bold text-center font-poppins pb-8">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {BlogsData.map((data) => (
            <UpdateFollower
              key={data.id}
              mouseOptions={{
                backgroundColor: "black",
                zIndex: 9999,
                followSpeed: 1.5,
                text: "read",
                textFontSize: "3px",
                scale: 5,
              }}
            >
              <div className="flex flex-col items-center justify-center gap-6 p-5 max-w-[300px] mx-auto shadow-lg rounded-md bg-white hover:-translate-y-2 duration-300">
                <img src={data.img} alt="" className="w-full h-auto" />
                <div className="space-y-2">
                  <h1 className="text-xl font-bold">{data.title}</h1>
                  <p>{data.desc}</p>
                </div>
              </div>
            </UpdateFollower>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
