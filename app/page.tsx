export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-6">Hello World</h1>
        <h2 className="text-xl font-semibold mb-3">Advantages of Claude Code</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Understands entire codebases with deep context awareness</li>
          <li>Edits files directly without copy-pasting snippets</li>
          <li>Runs terminal commands and interprets their output</li>
          <li>Fixes bugs end-to-end, from diagnosis to verified fix</li>
          <li>Works across multiple files and refactors at scale</li>
          <li>Integrates with git for commits, diffs, and pull requests</li>
          <li>Operates autonomously on long, multi-step tasks</li>
        </ul>
      </div>
    </div>
  );
}
