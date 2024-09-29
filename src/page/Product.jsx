import { Button, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Navbar = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role") || "User";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="navbar bg-gradient-to-r from-gray-800 to-gray-500 shadow-lg rounded-lg mb-8 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8213/8213253.png"
          alt="Profile"
          style={{ width: "40px", height: "40px" }} 
          className="rounded-full mr-3"
        />
        <div>
          <div className="font-bold text-white text-xl">{username}</div>
          <div className="text-gray-200">{role}</div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleHome}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-indigo-800 font-semibold py-2 px-4 rounded transition duration-200"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white hover:from-indigo-700 hover:to-indigo-800 font-semibold py-2 px-4 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
// Product Component
const Product = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [productId, setProductId] = useState();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/products");
    const product = res.data;
    setData(product);
    if (product.length > 0) {
      setSelectedProduct(product[0].name); 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.open("/");
      return;
    }

    fetchData();
  }, []);

  const showModal = () => setIsModalOpen(true);
  const showModalEdit = () => setIsModalEditOpen(true);
  const showModalDelete = () => setIsModalDeleteOpen(true);

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalEditOpen(false);
    setIsModalDeleteOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const resAddProduct = await axios.post(
        "http://localhost:5000/api/v1/products/",
        values
      );
      if (resAddProduct.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added successfully!",
        });
        setIsModalOpen(false);
        fetchData(); 
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product!",
      });
    }
  };

  const onFinishUpdate = async (values) => {
    try {
      const resEditProduct = await axios.put(
        `http://localhost:5000/api/v1/products/${productId}`,
        values
      );
      if (resEditProduct.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product updated successfully!",
        });
        setIsModalEditOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product!",
      });
    }
  };

  const onFinishDelete = async () => {
    try {
      const resDeleteProduct = await axios.delete(
        `http://localhost:5000/api/v1/products/${productId}`
      );
      if (resDeleteProduct.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product deleted successfully!",
        });
        setIsModalDeleteOpen(false);
        fetchData(); 
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete product!",
      });
    }
  };

  const handleSelectedProduct = (value) => {
    setProductId(value);
  };
  const handleCategoryClick = (type) => {
    setSelectedType(type);
  };

  const filteredData =
    selectedType === "All"
      ? data
      : data.filter((product) => product.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-gray-900 flex justify-center">
      <div className="w-full min-h-screen flex flex-col items-center p-4 my-1 ">
        {/* Navbar */}
        <Navbar />
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-white">
            ร้านขายคอมพิวเตอร์ โทรศัพท์ และแท็บเล็ต
          </h1>
          <p className="text-lg text-gray-200">
            เลือกชมสินค้าต่างๆ เช่น PC, Laptop, โทรศัพท์มือถือ, และ Tablet
          </p>
        </div>
        <div className="flex-col w-full max-w-7xl  ">
          <div className="flex justify-center my-8">
            <div className="flex space-x-8">
              <div
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick("All")}
              >
                <i className="fas fa-th text-3xl mx-3 text-gray-600"></i>
                <p className="mt-2 text-lg font-semibold text-white">All</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick("PC")}
              >
                <i className="fas fa-desktop text-3xl mx-3 text-blue-600"></i>
                <p className="mt-2 text-lg font-semibold text-white">PC</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick("Laptop")}
              >
                <i className="fas fa-laptop text-3xl mx-3 text-green-600"></i>
                <p className="mt-2 text-lg font-semibold text-white">Laptop</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick("Mobile")}
              >
                <i className="fas fa-mobile-alt text-3xl mx-3 text-yellow-600"></i>
                <p className="mt-2 text-lg font-semibold text-white">Mobile</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick("Tablet")}
              >
                <i className="fas fa-tablet-alt text-3xl text-purple-600"></i>
                <p className="mt-2 text-lg font-semibold text-white">Tablet</p>
              </div>
            </div>
          </div>

          {/* Show buttons for Admin and Moderator */}
          <div className="flex justify-end space-x-4 my-4">
            {localStorage.getItem("role") === "ROLES_ADMIN" && (
              <>
                <Button
                  onClick={showModal}
                  icon={<PlusOutlined />}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Product
                </Button>
                <Button
                  onClick={showModalEdit}
                  icon={<EditOutlined />}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Product
                </Button>
                <Button
                  onClick={showModalDelete}
                  icon={<DeleteOutlined />}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Product
                </Button>
              </>
            )}

            {localStorage.getItem("role") === "ROLES_MODERATOR" && (
              <>
                <Button
                  onClick={showModalEdit}
                  icon={<EditOutlined />}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Product
                </Button>
                <Button
                  onClick={showModalDelete}
                  icon={<DeleteOutlined />}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Product
                </Button>
              </>
            )}

            {localStorage.getItem("role") === "User" && (
              <p>You can only view products.</p>
            )}
          </div>

          <Input.Search
            placeholder="Search here..."
            className="my-4"
            prefix={<SearchOutlined />}
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <Table
            className="table bg-violet-300 p-2 rounded text-center"
            align="center"
            columns={[
              {
                title: (
                  <div className="bg-red-200 p-2 rounded text-center">Name</div>
                ),
                dataIndex: "name",
                key: "name",
                align: "center",
                filteredValue: [searchText],
                onFilter: (value, record) => {
                  return (
                    String(record.name)
                      .toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    String(record.type)
                      .toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    String(record.price)
                      .toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    String(record.brand)
                      .toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    String(record.specs)
                      .toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  );
                },
              },
              {
                title: (
                  <div className="bg-green-200 p-2 rounded text-center">
                    Type
                  </div>
                ),
                dataIndex: "type",
                key: "type",
                align: "center",
              },
              {
                title: (
                  <div className="bg-blue-200 p-2 rounded text-center">
                    Brand
                  </div>
                ),
                dataIndex: "brand",
                key: "brand",
                align: "center",
              },
              {
                title: (
                  <div className="bg-yellow-200 p-2 rounded text-center">
                    Specs
                  </div>
                ),
                dataIndex: "specs",
                key: "specs",
                align: "center",
              },
              {
                title: (
                  <div className="bg-purple-200 p-2 rounded text-center">
                    Price
                  </div>
                ),
                dataIndex: "price",
                key: "price",
                align: "center",
              },
              {
                title: (
                  <div className="bg-gray-200 p-2 rounded text-center px-2 w-full">
                    Image
                  </div>
                ),
                dataIndex: "imageUrl",
                key: "imageUrl",
                align: "center",
                className: "flex justify-center",

                render: (text, record) => {
                  return (
                    <img
                      className="w-20 h-20 object-cover rounded-lg items-center flex justify-center"
                      src={record.imageUrl}
                      alt={record.name}
                    />
                  );
                },
              },
            ]}
            dataSource={filteredData}
            pagination={{
              pageSize: 5,
            }}
            rowClassName="table-row"
          />
        </div>

        {/* Add Product Modal */}
        <Modal
          title="Add Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          centered
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }} 
            wrapperCol={{ span: 18 }} 
            style={{ maxWidth: 400, margin: "0 auto" }} 
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a type!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input a brand!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Specs"
              name="specs"
              rules={[{ required: true, message: "Please input specs!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input a price!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input an image URL!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          title="Edit Product"
          open={isModalEditOpen}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          centered
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 400, margin: "0 auto" }} // Reduced form width and centered it
            initialValues={{ remember: true }}
            onFinish={onFinishUpdate}
            autoComplete="off"
          >
            <Form.Item
              label="Select Product"
              name="product"
              rules={[{ required: true, message: "Please select a product!" }]}
            >
              <Select
                placeholder="Select a product"
                onChange={handleSelectedProduct}
              >
                {data.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input a brand!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Specs"
              name="specs"
              rules={[{ required: true, message: "Please input specs!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input a price!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input an image URL!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Delete Product Modal */}
        <Modal
          title="Delete Product"
          open={isModalDeleteOpen}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          centered
        >
          <p>Are you sure you want to delete this product?</p>
          <Select
            placeholder="Select a product"
            onChange={handleSelectedProduct}
            style={{ width: "100%" }}
          >
            {data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <div className="flex justify-end mt-4">
            <Button
              onClick={onFinishDelete}
              type="danger"
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Product;
