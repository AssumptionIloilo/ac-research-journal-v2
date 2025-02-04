// import { useQuery } from 'urql';

import useBackgroundColor from "@/hooks/use-background-color";
import { container } from "@/styles/variants";
import { cn } from "@/utils/cn";
import { useMetadata } from "vike-metadata-react";
import EditorialBoard from "./_components/editorial-board";

export default function AboutPage() {
  useMetadata({
    title: "About",
  });

  useBackgroundColor({ color: "#E6E6FA", enableTransition: true });

  // ===========================================================================
  // Queries
  // ===========================================================================

  // const [editorialBoardQuery] = useQuery({
  //   query: GetEditorialBoardDocument,
  // });
  const editorialBoardQuery: any = null;

  return (
    <div className={container({ class: "pt-10 pb-20 gap-y-10" })}>
      <header className="flex flex-col gap-y-8">
        <h1 className="mx-auto max-w-xl w-full text-center text-dark-500 font-medium text-3xl">
          Discover Our Journey:
          <br />
          Unveiling the Story <span className="text-primary-600">Assumption Iloilo</span> -
          Empowering Minds, Shaping Futures
        </h1>
        <img src="/about-banner.png" alt="about banner" width={1520} height={598} />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-x-10 gap-y-5">
        <h2 className="text-dark-500 text-3xl font-bold">About AC Publications</h2>
        <div>
          <p className="indent-10 text-dark-400">
            AC Publications is a collective site for the archives of <b>Transformateur</b> and{" "}
            <b>Mariale</b>
          </p>
          <p className="indent-10 text-dark-400"></p>
        </div>
      </section>

      <section className="">
        <h2 className="text-dark-500 text-3xl font-bold text-center">Editorial Board</h2>

        <div className="h-5" />
        {editorialBoardQuery?.data?.EditorialBoard?.boardGroups?.length ? (
          <EditorialBoard boardGroups={editorialBoardQuery?.data?.EditorialBoard?.boardGroups!} />
        ) : (
          <div className="text-gray-500 text-center">Editorial board has no data.</div>
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-x-10 gap-y-5">
        <h2 className="text-dark-500 text-3xl font-bold">Mariale</h2>
        <div>
          <p className="indent-10 text-dark-400 pb-2">
            Mariale is The Official Student Publication of Assumption Iloilo.
          </p>
          <p className="indent-10 text-dark-400">
            Throughout the years, Assumption Iloilo has evolved, responding to changing times and
            challenges. And the Mariale has been a chronicler of this transformation. It has
            recorded the school's responses to social, educational, and cultural shifts, providing
            valuable insights into the forces that have shaped not just our institution, but the
            hearts and minds of the Assumption Community. — <i>Gianna Therese D. Varona 12-OLL</i>
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-x-10 gap-y-5">
        <h2 className="text-dark-500 text-3xl font-bold">Transformateur</h2>
        <div>
          <p className="indent-10 text-dark-400">
            Transformateur is the multidisciplinary research journal of Assumption Iloilo Faculty &
            Staff.
          </p>
        </div>
      </section>

      <section className="relative flex flex-col items-center mt-10">
        <div className="rounded-full px-5 py-2 font-bold absolute -top-5 bg-[#E8DCAD] text-[#9A7D07]">
          About The Logo
        </div>
        <div
          className={cn(
            "bg-white text-sm p-8 rounded-3xl flex flex-col items-center gap-y-5 text-dark-400",
            "md:p-14"
          )}
        >
          <h3 className={cn("text-4xl text-primary-500 font-mixOldGirl pb-1", "md:text-5xl")}>
            transformateur
          </h3>
          {/* <Logo color="#2E2FA5" /> */}
          <p className="indent-10">
            At Assumption Iloilo, we believe in the transformative power of education and the
            profound impact it has on shaping young minds. "Transformateur" is our esteemed journal
            publication, dedicated to showcasing the intellectual prowess and creative brilliance of
            our students, faculty, and staff.
          </p>
          <p className="indent-10">
            As a premier educational institution, Assumption Iloilo has always strived to foster a
            holistic learning environment that nurtures critical thinking, innovative ideas, and a
            deep appreciation for knowledge. Our journal, "Transformateur," serves as a platform for
            our community to share their academic achievements, research findings, artistic
            endeavors, and insightful reflections.
          </p>
          <p className="indent-10">
            Through this publication, we aim to celebrate the diverse talents and interests of our
            students and educators. Each issue of "Transformateur" features a collection of
            thought-provoking articles, scholarly papers, captivating artworks, poetry, and more,
            highlighting the intellectual and artistic expressions of our school's community. Our
            journal also acts as a bridge, connecting Assumption Iloilo with the wider academic and
            creative community. By providing a space for sharing ideas and knowledge,
            "Transformateur" contributes to the enrichment of the academic landscape and promotes
            interdisciplinary collaborations. Whether you are a student, an educator, a parent, or a
            member of the broader community, we invite you to delve into the pages of
            "Transformateur" and witness the transformational journey that unfolds within our
            school. We hope that this publication inspires and motivates readers to explore new
            realms of thought, embrace their passions, and make a positive impact on the world.
          </p>
          <p className="indent-10">
            Join us as we embark on a voyage of knowledge, creativity, and inspiration with
            "Transformateur: The Official Journal Publication of Assumption Iloilo." Together, let
            us celebrate the power of education in transforming lives and shaping a brighter future.
          </p>
        </div>
      </section>
    </div>
  );
}
