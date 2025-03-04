export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About RoasTodo</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          RoasTodo is a unique todo application that adds a fun twist to task management.
          Not only does it help you organize your tasks, but it also provides witty
          roasts when you fail to complete them on time!
        </p>
        <p>
          Built with Next.js, TypeScript, and Tailwind CSS, RoasTodo offers a modern
          and responsive user interface that works seamlessly across all your devices.
        </p>
        <p>
          Features:
        </p>
        <ul>
          <li>Secure authentication with NextAuth.js</li>
          <li>Real-time task management</li>
          <li>Witty roasts for overdue tasks</li>
          <li>Dark mode support</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  )
} 