import { useEffect, useState } from "react";
import { api } from "./api/api";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [idempotencyId, setIdempotencyId] = useState(null);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get(
          "http://localhost:3333/api/transactions"
        );
        const data = await response.data;
        setTransactions(data);
        setIdempotencyId(data.idempotencyId);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    getTransactions();
  }, [idempotencyId]);

  return (
    <>
      <div className="container mx-auto mt-8">
        <table className="min-w-full bg-black border-2 border-green-700 mb-5">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-green-700">Cliente</th>
              <th className="py-2 px-4 border-b border-green-700"></th>
              <th className="py-2 px-4 border-b border-green-700 text-left">
                Valor
              </th>
              <th className="py-2 px-4 border-b border-green-700">
                Método de Pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={Math.random()}>
                  <td className="py-2 px-4 border-b text-left border-green-700">
                    {transaction.idempotencyId}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-green-700">
                    {transaction.cliente}
                  </td>
                  <td className="py-2 px-4 border-b text-left border-green-700">
                    R$ {transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-green-700">
                    {transaction.type}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
