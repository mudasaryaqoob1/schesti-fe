import { LandingNavbar } from "./component/navbar/LandingNavbar";

export default function Home() {
  return (
    <main style={{
      background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
    }} className="h-[760px]">
      <LandingNavbar />
    </main>
  );
}
