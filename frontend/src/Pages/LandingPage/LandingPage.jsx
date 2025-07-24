import { useState, useEffect } from "react";

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center relative overflow-hidden">
      <div className="flex  items-center min-h-[92vh]">
        <h2 className="text-center text-txt font-oswald w-full text-[6rem] font-bold">
          SK<span className="text-tl">I</span>LL H
          <span className="text-tl">U</span>B
        </h2>
      </div>

      <h2 className="text-center text-txt font-oswald px-5 w-full text-[3rem] font-bold  border-b  border-brd">
        WHY SKILL HUB?
      </h2>

      <div className="text-center items-center min-h-[82vh]  mt-10">
        <div className="font-montserrat text-txt text-[1.2rem] max-w-[1000px] mx-auto p-6">
          <p className="mb-10">
            At Skill Hub, we believe in the power of mutual learning and
            collaboration. Here's why Skill Hub is the ultimate platform for
            skill acquisition and knowledge exchange:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div>
              <h4 className="text-tl border-b border-brd font-semibold mb-2">
                Learn From Experts
              </h4>
              <p>
                Gain insights and practical knowledge directly from experienced
                mentors who excel in their fields.
              </p>
            </div>
            <div>
              <h4 className="text-tl border-b border-brd font-semibold mb-2">
                Share Your Expertise
              </h4>
              <p>
                Become a mentor, share your skills, and foster a thriving
                learning community.
              </p>
            </div>
            <div>
              <h4 className="text-tl border-b border-brd font-semibold mb-2">
                Collaborative Environment
              </h4>
              <p>
                Connect, collaborate, and innovate with like-minded learners on
                real projects.
              </p>
            </div>
            <div>
              <h4 className="text-tl border-b border-brd font-semibold mb-2">
                Diverse Learning Opportunities
              </h4>
              <p>
                Explore a wide range of free skills—from arts to advanced
                tech—based on your interests.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-tl border-b border-brd font-semibold mb-2">
                Continuous Growth
              </h4>
              <p>
                Stay curious and keep learning at your own pace, whether you're
                a beginner or a pro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
