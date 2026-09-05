/** Shown instead of posts when the WordPress backend is not reachable yet. */
export default function SetupNotice({ error }: { error?: string }) {
  return (
    <div className="rounded-lg border border-amber-400 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950/30">
      <h2 className="text-lg font-bold">WordPress is not connected yet</h2>

      {error && (
        <p className="mt-2 font-mono text-sm text-amber-800 dark:text-amber-300">
          {error}
        </p>
      )}

      <div className="prose prose-sm prose-gray mt-4 max-w-none dark:prose-invert">
        <p>To connect the backend:</p>
        <ol>
          <li>
            Find your WPGraphQL endpoint. It is your WordPress URL followed by{" "}
            <code>/graphql</code> — confirm it under{" "}
            <strong>GraphQL → Settings</strong> in wp-admin.
          </li>
          <li>
            Add it to <code>.env.local</code> for local development:
            <pre>
              <code>
                WORDPRESS_API_URL=https://live-your-site.pantheonsite.io/graphql
              </code>
            </pre>
          </li>
          <li>Restart the dev server so the new variable is picked up.</li>
          <li>
            Set the same variable in the Pantheon environment variables for Test
            and Live, pointing each at the appropriate backend.
          </li>
        </ol>
      </div>
    </div>
  );
}
