import React from "react";
import { FaTrash } from "react-icons/fa";
import { ClientType } from "../types/index";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

type Props = {
  client: ClientType;
};

const ClientRow: React.FC<Props> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const clients: any = cache.readQuery({ query: GET_CLIENTS });

    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter(
    //         (client: ClientType) => client.id !== deleteClient.id
    //       ),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          onClick={() => deleteClient()}
          className="btn btn-danger btn-sm"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
