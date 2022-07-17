import { useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { ClientType } from "../types";

type Props = {};

const AddProjectModal: React.FC<Props> = ({}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const closeModalBtn = useRef<HTMLButtonElement>(null);

  // Get Clients for select
  const { loading, error, data: clientsData } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    refetchQueries: [{ query: GET_PROJECTS }],
    // update(cache, { data: { addProject } }) {
    //   const projects: any = cache.readQuery({ query: GET_PROJECTS });

    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: {
    //       projects: [...projects, addProject],
    //     },
    //   });
    // },
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(name, email, phone);
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject();

    setName("");
    setDescription("");
    setStatus("");
    setClientId("");

    closeModalBtn.current?.click();
  };

  // TODO Implement Loading state for clients Data Fetching

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#AddProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="AddProjectModal"
            tabIndex={-1}
            aria-labelledby="AddProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="AddProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        required
                        className="form-control"
                        id="email"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="client" className="form-label">
                        Client
                      </label>
                      <select
                        id="client"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {clientsData.clients.map((client: ClientType) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        ref={closeModalBtn}
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button className="btn btn-primary" type="submit">
                        Add Client
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AddProjectModal;
