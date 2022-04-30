import { useCallback, useMemo, useState } from "react";
// import * as ReactQuill from "react-quill"; // Typescript
import { FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import GoogleMapReact from "google-map-react";
import { BusinessModel, Category, Product, TRL } from "../../helpers/types";
import { useAppSelector } from "../../hooks/redux_hooks";
import { configurationsSelector } from "../../store/features/configurationsSlice";
import BussinessModal from "../../components/Modals/BusinessModal";
import TRLModal from "../../components/Modals/TRLModal";
import CategoryModal from "../../components/Modals/CategoryModal";
import DescriptionModal from "../../components/Modals/DescriptionModal";
import { updateProduct } from "../../api/products";
import Loading from "../common/Loading";

type Props = {
  product: Product | null;
  handleUpdateProduct: (product: Product | null) => void;
  trls: Array<TRL>;
};
const ProductDetailComponent = (props: Props) => {
  const [product, setProduct] = useState<Product | null>(props.product);
  const { configuration } = useAppSelector(configurationsSelector);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isBussinessModalOpen, setIsBussinessModalOpen] = useState(false);
  const [isTRLModalOpen, setIsTRLModalOpen] = useState(false);
  const [selectedTRL, setSelectedTRL] = useState<TRL | null>(null);

  const Marker = ({ text }: { text: string; lat?: number; lng?: number }) => (
    <div>
      <FaMapMarkerAlt className="text-red-700 w-5 h-20" />
    </div>
  );

  const CompanyMap = () => {
    return product?.company.address ? (
      <div className="google-map my-10 w-full h-[300px] lg:h-[400px] border">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
          }}
          defaultCenter={{
            lat: Number(product.company.address.latitude) || 59.955413,
            lng: Number(product.company.address.longitude) || 30.337844,
          }}
          defaultZoom={11}
        >
          <Marker lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    ) : (
      <Loading />
    );
  };

  return (
    <main>
      {isDescriptionModalOpen && (
        <div className="w-screen  h-screen flex items-center justify-center">
          <DescriptionModal
            handleClose={() => setIsDescriptionModalOpen(false)}
            handleSubmit={(value) => {
              if (product) {
                setProduct(() => ({
                  ...product,
                  description: value,
                }));
                setIsDescriptionModalOpen(false);
              }
            }}
            text={product?.description || ""}
          />
        </div>
      )}
      {isCategoriesModalOpen && (
        <div className="w-screen  h-screen flex items-center justify-center">
          <CategoryModal
            handleClose={() => setIsCategoriesModalOpen(false)}
            handleSubmit={(value) => {
              if (product) {
                setProduct(() => ({
                  ...product,
                  categories: value,
                }));
                setIsCategoriesModalOpen(false);
              }
            }}
            product={product}
          />
        </div>
      )}
      {isBussinessModalOpen && (
        <div className="w-screen h-screen flex items-center justify-center">
          <BussinessModal
            product={product}
            handleClose={() => setIsBussinessModalOpen(false)}
            handleSubmit={(value) => {
              if (product) {
                setProduct(() => ({
                  ...product,
                  businessModels: value,
                }));
                setIsBussinessModalOpen(false);
              }
            }}
          />
        </div>
      )}

      {isTRLModalOpen && (
        <div className="w-screen  h-screen flex items-center justify-center">
          <TRLModal
            trls={props.trls}
            selectedTRL={product?.trl}
            handleClose={() => setIsTRLModalOpen(false)}
            handleSubmit={(sTRL) => {
              if (product) {
                setProduct(() => ({
                  ...product,
                  trl: sTRL,
                }));
                setIsTRLModalOpen(false);
              }
            }}
          />
        </div>
      )}
      {product !== props.product && (
        <div className="border p-4 flex items-center justify-between bg-blue-100 rounded-xl">
          <h2>Product Detail Changed!</h2>
          <button
            onClick={() => props.handleUpdateProduct(product)}
            className="px-5 py-2 bg-blue-700 rounded-lg text-white"
          >
            Save Changes
          </button>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
        <div className="w-full lg:w-2/3">
          <div className="h-[400px]">
            <img
              className="w-full h-full object-fit"
              src={product?.picture}
              alt={product?.name}
            />
          </div>
          <div>
            <div>
              <h1 className="my-5 text-3xl">
                <strong>Title: </strong>
                {product?.name}
              </h1>
              <h1 className="my-5 text-2xl">
                <strong>Type: </strong>
                {product?.type?.name}
              </h1>
            </div>
          </div>
          <div className="w-full flex my-5 border-2 rounded-xl">
            <button
              onClick={() => setSelectedTab(0)}
              className={`p-5 w-1/2 ${
                selectedTab == 0 ? "text-white bg-slate-800" : ""
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setSelectedTab(1)}
              className={`p-5 w-1/2 ${
                selectedTab == 1 ? "text-white bg-slate-800" : ""
              }`}
            >
              Attributes
            </button>
          </div>
          <div className="tabs my-5">
            {selectedTab === 0 ? (
              <div>
                <div className="flex justify-end my-3">
                  <button onClick={() => setIsDescriptionModalOpen(true)}>
                    <FaEdit fontSize={20} className="text-blue-800" />
                  </button>
                </div>
                <div
                  className="my-1"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
              </div>
            ) : (
              <div className="my-1">
                <div className="my-2">
                  <div className="flex justify-between">
                    <p className="font-bold my-2">Categories: </p>
                    <button onClick={() => setIsCategoriesModalOpen(true)}>
                      <FaEdit fontSize={20} className="text-blue-800" />
                    </button>
                  </div>
                  {product?.categories?.map((category: Category) => (
                    <button className="m-1 rounded-full bg-gray-600 text-white px-10 py-2 cursor-pointer">
                      {category.name}
                    </button>
                  ))}
                </div>
                <div className="my-2 ">
                  <div className="flex justify-between">
                    <p className="font-bold my-2">Business Models: </p>
                    <button onClick={() => setIsBussinessModalOpen(true)}>
                      <FaEdit fontSize={20} className="text-blue-800" />
                    </button>
                  </div>
                  {product?.businessModels?.map((model: BusinessModel) => (
                    <p className="m-1 " key={model.id}>
                      {model.name}
                    </p>
                  ))}
                </div>
                <div className="my-2">
                  <div className="flex justify-between">
                    <p className="font-bold my-2">TRL: </p>
                    <button onClick={() => setIsTRLModalOpen(true)}>
                      <FaEdit fontSize={20} className="text-blue-800" />
                    </button>
                  </div>
                  <p className="m-1 ">{product?.trl.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          {configuration && configuration.hasUserSection && (
            <div>
              <h1 className="text-2xl font-semibold">User Info</h1>
              <div className="h-16 w-16 my-5">
                <img
                  className="rounded-full w-full h-full"
                  src={product?.user?.profilePicture}
                  alt={product?.user?.email}
                />
              </div>
              <p className="my-2">
                <strong>FullName: </strong>
                {`${product?.user?.firstName}  ${product?.user?.lastName}`}
              </p>
            </div>
          )}
          <div>
            <div className="my-2 ">
              <p className="my-2">
                <strong>Company Name: </strong>
                {product?.company?.name}
              </p>
              <p className="my-2">
                <strong>Address: </strong>
                {`${product?.company?.address.zipCode}, ${product?.company?.address.street}, ${product?.company?.address.city.name}, ${product?.company?.address.country.name}`}
              </p>
            </div>
            <CompanyMap />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailComponent;
