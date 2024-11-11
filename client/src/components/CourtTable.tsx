import React from "react";

interface CourtTableProps {
    data: any[];
    onEdit: (court: any) => void;
    onDelete: (id: string) => void;
}

const CourtTable: React.FC<CourtTableProps> = ({ data, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Nazwa Sądu</th>
                    <th>Rok Statystyczny</th>
                    <th>Kategoria Spraw</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {data.map((court) => (
                    <tr key={court._id}>
                        {/* <td>{court._id}</td> */}
                        <td>{court.court_name}</td>
                        <td>
                            {court.statistics
                                .map((stat: any) => stat.year)
                                .join(", ")}
                        </td>
                        <td>
                            {court.statistics
                                .map((stat: any) =>
                                    stat.cases
                                        .map((c: any) => c.category)
                                        .join(", ")
                                )
                                .join(", ")}
                        </td>
                        <td>
                            <button onClick={() => onEdit(court)}>Edit</button>
                            <button onClick={() => onDelete(court._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CourtTable;
