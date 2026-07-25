import type { Route } from './+types/index';
import Hero from '~/components/Hero';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev' },
    { name: 'description', content: 'Custom Website Devlopment' },
  ];
}

export default function Home() {
  return <section>
    <Hero />
  </section>;
}
