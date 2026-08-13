import CoverParticles from "@/components/cover-particles";
import Inicio from "@/components/inicio";
import Introduction from "@/components/introduction";
import TransitionPage from "@/components/transition-page";
import Login from "@/components/loging";

export default function Home() {
  return (
    <main className="h-full w-full overflow-hidden ">
         <TransitionPage />
      <div className="flex min-h-[100vh] h-full bg-no-repeat bg-gradient-custom">
      <CoverParticles />
      <Inicio/>
      <Login/>
      </div>
    </main>
  );
}
