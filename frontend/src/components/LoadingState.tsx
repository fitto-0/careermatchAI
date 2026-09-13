export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-violet-500" />

      <h3 className="text-lg font-semibold text-white">
        Analyzing your profile...
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        CareerMatch AI is comparing your CV with the job description.
      </p>
    </div>
  );
}