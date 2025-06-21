export default function PrivacyPolicyPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        FocusTube does not collect any personal information from users.
        We do not store your search history, personal data, or session activity.
      </p>
      <p className="text-gray-700 mb-4">
        The only external service we interact with is the YouTube Data API, which is used to fetch topic-specific videos. 
        Your interaction with videos is solely between your browser and YouTube.
      </p>
      <p className="text-gray-700 mb-4">
        We may use basic analytics to understand overall usage patterns, but these are fully anonymized and do not track individual users.
      </p>
      <p className="text-gray-700">
        If you have any questions regarding privacy or data usage, feel free to <a
  href="mailto:subhashujh001@gmail.com"
  className="text-blue-600 underline hover:text-blue-800"
>
  Email us
</a>
.
      </p>
    </div>
  );
}
