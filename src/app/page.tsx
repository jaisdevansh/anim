import ScrollSequence from '@/components/ScrollSequence';
import Navbar from '@/components/Navbar';
import MenuPreview from '@/components/MenuPreview';
import Story from '@/components/Story';
import Reviews from '@/components/Reviews';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <ScrollSequence />
      <MenuPreview />
      <Story />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}
