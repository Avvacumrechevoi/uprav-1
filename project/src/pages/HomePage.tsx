import { Hero } from '../components/Hero';
import { AboutProject } from '../components/AboutProject';
import { ParticipationPaths } from '../components/ParticipationPaths';
import HowToJoin from '../components/HowToJoin';
import { ApplicationForm } from '../components/ApplicationForm';

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutProject />
      <HowToJoin />
      <ParticipationPaths />
      <ApplicationForm />
    </>
  );
}
