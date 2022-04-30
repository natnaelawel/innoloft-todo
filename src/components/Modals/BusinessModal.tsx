import { useState } from "react";
import { BusinessModel, Product } from "../../helpers/types";
import ModalContainer from "../common/ModalContainer";

type Props = {
  product: Product | null;
  handleClose: () => void;
  handleSubmit: (businessModels: Array<BusinessModel> | null) => void;
};

const BussinessModal = (props: Props) => {
  const [businessModels, setBusinessModels] = useState<Array<BusinessModel>>(
    props.product?.businessModels || []
  );

  const handleChange = (id: number) => (e: any) => {
    const newBusinessModels = businessModels.map((models) => {
      if (models.id === id) {
        return { ...models, name: e.target.value };
      }
      return models;
    });
    setBusinessModels(newBusinessModels);
  };

  return (
    <ModalContainer title="Bussiness" handleClose={props.handleClose}>
      <div className="p-10">
        <div className="p-5">
          {businessModels && businessModels.length > 1 ? (
            businessModels?.map((model: BusinessModel, index: number) => (
              <div className="my-2" key={model.id}>
                <label htmlFor={model.id.toString()}>{index + 1}, </label>
                <input
                  className="px-3 py-1 border-2  rounded-lg outline-1"
                  id={model.id.toString()}
                  type="text"
                  value={model.name}
                  onChange={handleChange(model.id)}
                />
              </div>
            ))
          ) : (
            <div>No Bussiness Model</div>
          )}
        </div>
        <div className="my-5 flex justify-end items-center px-10 gap-x-3">
          <button
            onClick={props.handleClose}
            className="px-4 py-2 rounded-lg bg-blue-100"
          >
            Cancel
          </button>
          <button
            onClick={() => props.handleSubmit(businessModels)}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default BussinessModal;
