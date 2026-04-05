import { useState, useEffect } from "react";

const AddTransactionForm = ({ onAdd, editData }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
  });

  //PREFILL (EDIT MODE)
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        amount: editData.amount || "",
        type: editData.type || "income",
        category: editData.category || "",
      });
    }
  }, [editData]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.title || !formData.amount) return;

    onAdd(formData);

    // reset only when adding (not editing)
    if (!editData) {
      setFormData({
        title: "",
        amount: "",
        type: "income",
        category: "",
      });
    }
  };

  return (
    <form className="border border-border rounded-lg p-4 bg-card space-y-3" onSubmit={handleSubmit}>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* BUTTON AUTO CHANGE */}
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded w-full"
      >
        {editData ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default AddTransactionForm;