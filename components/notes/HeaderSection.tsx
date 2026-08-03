import { SearchIcon } from "@/public/icons/SearchIcon";
import TopPicks from "./TopPicks";
import NoteCard from "./NoteCard";

const HeaderSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-16 pb-12 px-6">
      <div className="flex flex-col items-center ">
        <h1 className="text-[40px] text-center font-medium mt-20 text-[rgba(0,0,0,0.9)]">
          Insights and Inspiration, <br />
          Explore My Notes
        </h1>
        <p className="text-[15px] font-normal text-center mt-4 w-[90%] text-[rgba(0,0,0,0.5)]">
          Dive into my collection of notes, filled with insights and inspiration
          to help you on your journey.
        </p>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="w-[400px] h-[45px] flex justify-center items-center bg-[rgba(0,0,0,0.05)] pl-5 pr-1.5 rounded-full">
          <input
            type="text"
            placeholder="Search notes..."
            className="h-full w-full outline-none border-none text-[14px]"
          />
          <div className="h-[38px] w-[45px] rounded-full flex justify-center items-center cursor-pointer">
            <SearchIcon color="rgba(0,0,0,0.5)" size={18} />
          </div>
        </div>
      </div>
      <TopPicks />
      <div className="mt-[50px] w-full grid grid-cols-1 md:grid-cols-3 px-[9vw] gap-6">
        <NoteCard
          image="/images/work_efficiency_blog.png"
          title="Optimizing Workflow Processes for Maximum Efficiency"
          description="Understand the importance of optimizing workflow processes to enhance efficiency...."
          authorName="Joel Keneley"
          authorAvatar="/images/joel_keneley.png"
          readTime="4 Min Read"
        />
        <NoteCard
          image="/images/project_documentation_blog.png"
          title="The Art of Writing Clean Project Documentation"
          description="Learn the key principles of writing documentation that your team will actually enjoy reading..."
          authorName="Sarah Devis"
          authorAvatar="/images/sarah_devis.png"
          readTime="6 Min Read"
        />
        <NoteCard
          image="/images/stakeholder_management_blog.png"
          title="Effective Stakeholder Management in Agile Projects"
          description="Discover strategies to keep stakeholders engaged, informed, and aligned throughout the project lifecycle..."
          authorName="Micheal Smith"
          authorAvatar="/images/micheal_smith.png"
          readTime="8 Min Read"
        />
      </div>
    </section>
  );
};

export default HeaderSection;
