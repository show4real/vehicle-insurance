import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";

const ListXYZT = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch forms using POST method
  const fetchForms = async (page = 1, rows = 10) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8083/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, rows }),
      });

      const result = await response.json();
      setData(result.forms.data);
      setTotalItems(result.forms.total);
    } catch (error) {
      message.error("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  // Delete form using POST method
  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://127.0.0.1:8083/api/delete/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result) {
        message.success("Form deleted successfully");
        fetchForms(currentPage, pageSize); // Reload the data
      } else {
        message.error("Form not found");
      }
    } catch (error) {
      message.error("Failed to delete form");
    }
  };

  // Handle pagination
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    fetchForms(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchForms(currentPage, pageSize);
  }, []);

  // Table columns definition
  const columns = [
    {
      title: "Form ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Form Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this form?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ListXYZT;
