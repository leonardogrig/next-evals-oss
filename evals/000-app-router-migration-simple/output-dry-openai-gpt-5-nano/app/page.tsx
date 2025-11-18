import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Welcome to our Next.js app'
};

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to our Next.js application!</p>
      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </main>
  );
}
