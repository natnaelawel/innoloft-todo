import { useState } from "react";
import ReactQuill from "react-quill";
import ModalContainer from "../common/ModalContainer";

type Props = {
  text: string;
  handleSubmit: (description: string) => void;
  handleClose: () => void;
};

const DescriptionModal = ({ text, handleClose, handleSubmit }: Props) => {
  const [description, setDescription] = useState(text);

  return (
    <ModalContainer title="Description" handleClose={handleClose}>
      <div className="px-10 py-3">
        <ReactQuill
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
          ]}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          value={description}
          onChange={(e) => setDescription(e)}
        />

        <div className="my-5 flex justify-end items-center px-10 gap-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-blue-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(description)}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DescriptionModal;
