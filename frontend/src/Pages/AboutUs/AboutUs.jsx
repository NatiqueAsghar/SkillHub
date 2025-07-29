const AboutUs = () => {
  return (
    <div className="flex flex-row items-start justify-center bg-background flex-wrap min-h-[92vh]">
      <div className="max-w-[50vw] m-10">
        <h2 className="text-3xl font-bold mb-5 text-left text-tl font-Montserrat">
          About Us
        </h2>
        <p className="text-txt leading-relaxed text-left font-montserrat text-[1.3rem]">
          As students, we have looked for upskilling everywhere. Mostly, we end
          up paying big amounts to gain certifications and learn relevant
          skills. We thought of SkillHub to resolve that. Learning new skills
          and gaining more knowledge all while networking with talented people!
        </p>
        <p className="text-txt  leading-relaxed text-left font-montserrat mt-6 text-[1.3rem]">
          At SkillHub, we believe in the power of learning and sharing
          knowledge. Our platform connects individuals from diverse backgrounds
          to exchange practical skills and expertise. Whether you're a seasoned
          professional looking to mentor others or a beginner eager to learn,
          SkillHub provides a supportive environment for growth and
          collaboration.
          <br />
          <br />
          Our mission is to empower individuals to unlock their full potential
          through skill sharing. By facilitating meaningful interactions and
          fostering a culture of lifelong learning, we aim to create a community
          where everyone has the opportunity to thrive.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
