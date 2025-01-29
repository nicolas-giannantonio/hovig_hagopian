import ResumeSection from "@/app/resume/ResumeSection";

const data = [
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
  {
    title: "Factice, Julie Rohart, 2025 ",
    info: "Saison 1, 6x45 min, Universal + , Treizième Rue ",
  },
];

export default function Page() {
  return (
    <div id={"resume"}>
      <ResumeSection content={data} title={"series"} />
      <ResumeSection content={data} title={"series"} />
      <ResumeSection content={data} title={"series"} />
      <ResumeSection content={data} title={"series"} />
    </div>
  );
}
