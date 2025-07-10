import { TableHeader } from './Header';
import { Loading } from '../Loading';
import { ErrorMessage } from '../ErrorMessage';
import { TableRow } from './Row';
import useObservations from '../../hooks/useObservations';

export const MeasurementsTable = () => {
  const { loading, error, data } = useObservations();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Tableau biologique
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader dates={data.dates} />
              <tbody className="bg-white divide-y divide-gray-200">
                {data.observations.map((observations) => (
                  <TableRow
                    key={observations.code}
                    dates={data.dates}
                    observations={observations}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {data.observations.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            Aucune donnée disponible
          </div>
        )}
      </div>
    </div>
  );
};
