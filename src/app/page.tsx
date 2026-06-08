import { ToastProvider } from "@/components/invitation/Toast";
import Hero from "@/components/invitation/Hero";
import Greeting from "@/components/invitation/Greeting";
import Calendar from "@/components/invitation/Calendar";
import Gallery from "@/components/invitation/Gallery";
import MapSection from "@/components/invitation/MapSection";
import Accounts from "@/components/invitation/Accounts";
import Contact from "@/components/invitation/Contact";
import Share from "@/components/invitation/Share";
import FloatingButtons from "@/components/invitation/FloatingButtons";

export default function Page() {
  return (
    <ToastProvider>
      <main className="mx-auto min-h-screen w-full max-w-card bg-ivory shadow-[0_0_60px_rgba(0,0,0,0.04)]">
        <Hero />
        <div className="hr-dot" />
        <Greeting />
        <Calendar />
        <Gallery />
        <MapSection />
        <Accounts />
        <Contact />
        <Share />
      </main>
      <FloatingButtons />
    </ToastProvider>
  );
}
