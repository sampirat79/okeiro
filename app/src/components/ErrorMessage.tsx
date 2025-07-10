export const ErrorMessage = ({ error }: { error: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-lg text-red-600">Erreur: {error}</div>
  </div>
);
