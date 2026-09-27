import WeekOverview from "./_components/WeekOverview";

export default function TrainingHome() {
  return (
    <main>
      <section className="trn-intro">
        <p>
          {"This course covers JavaScript basics through expert triage, including how Next.js runs on Pantheon and Front-End Sites (FES) and migration. "}
          {"The labs use two real sites: "}
          <b>{"brix-nextjs"}</b>
          {" (this Next.js site) and "}
          <b>{"brix-nextjs-cms"}</b>
          {" (its WordPress back end). The course code is part of the lab, too: see "}
          <code>{"app/training/"}</code>
          {"."}
        </p>
      </section>
      <WeekOverview />
    </main>
  );
}
