import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const HistoryTransfer = () => {
  const { transfers } = useSelector((state) => state.transfers);

  return (
    <div className="border-2 rounded w-full">
      <div className="overflow-y-scroll h-[500px]">
        <table className="w-full table-auto">
          <thead className="capitalize text-xs sm:text-base text-gray-100 font-medium border-b-[1px] border-gray-100">
            <tr>
              <th className="py-1">Numero De Cuenta</th>
              <th className="py-1">Fecha</th>
              <th className="py-1">Monto Transferido</th>
              <th className="py-1">Nombre Del Destinatario</th>
            </tr>
          </thead>
          <tbody className="">
            {transfers?.slice().reverse().map((data) => {
              return (
                <tr
                  key={data.id}
                  className="text-center text-xs sm:text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                >
                  <td className="py-4">
                    <span>{data.receiverUserAccount}</span>
                  </td>
                  <td className="py-4">
                    <span>
                      {moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td className="py-4">
                  <span>
                      {data.amount} $USD
                    </span>
                  </td>
                  <td className="py-4">
                  <span>
                      {data.receiverUserName}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
