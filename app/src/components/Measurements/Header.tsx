const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const TableHeader = ({ dates }: { dates: Date[] }) => (
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
      {dates.map((date) => {
        const dateString = formatDate(date);
        return (
          <th
            key={dateString}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {dateString}
          </th>
        );
      })}
    </tr>
  </thead>
);
