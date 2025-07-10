import type { Observations } from '../../types/observation.types';

export const TableRow = ({
  dates,
  observations,
}: {
  dates: Date[];
  observations: Observations;
}) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      Potassium
    </td>
    {dates.map((date) => {
      const foundObservation = observations.data.find(
        (observation) => observation.date.toJSON() === date.toJSON()
      );
      return (
        <td
          key={`${observations.code}-${date}`}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        >
          {foundObservation?.value}
        </td>
      );
    })}
  </tr>
);
