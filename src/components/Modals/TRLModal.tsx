import { useState } from "react";
import { Product, TRL } from "../../helpers/types";
import ModalContainer from "../common/ModalContainer";

type Props = {
  trls: Array<TRL>;
  selectedTRL: TRL | any;
  handleClose: () => void;
  handleSubmit: (selectedTRL: TRL) => void;
};

const TRLModal = ({ handleClose, handleSubmit, trls, selectedTRL }: Props) => {
  const [trl, setTrl] = useState(selectedTRL);
  return (
    <ModalContainer title="Change TRL" handleClose={handleClose}>
      <div className="p-5">
        <div>
          <label
            htmlFor="trls"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select an TRLs
          </label>
          <select
            id="trls"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              const rs = trls.find(
                (t) => t.id.toString() === e.target.value.toString()
              );
              setTrl(rs);
            }}
          >
            {trls.length > 0 &&
              trls.map((t) => {
                return (
                  <option
                    selected={trl?.id.toString() === t.id.toString()}
                    key={t.id}
                    value={t.id}
                  >
                    {t.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="my-5 flex justify-end items-center px-10 gap-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-blue-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(trl)}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TRLModal;
