import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

const customCategories = [
  { id: "animals", name: "Animals" },
  { id: "chhatri", name: "Chhatri" },
  { id: "dhaulpur-stone", name: "Dhaulpur Stone" },
  { id: "garden-fountain", name: "Garden Fountain" },
  { id: "garden-ornaments", name: "Garden Ornaments" },
  { id: "gate", name: "Gate" },
  { id: "gwalior-stone", name: "Gwalior Stone" },
  { id: "heritage-haveli", name: "Heritage Haveli" },
  { id: "jodhpur-stone", name: "Jodhpur Stone" },
  { id: "pink-sand-stone", name: "Pink Sand Stone" },
  { id: "red-stone", name: "Red Stone" },
  { id: "stone-carving", name: "Stone Carving" },
  { id: "stone-temple", name: "Stone Temple" },
  { id: "wall-panel", name: "Wall Panel" },
];

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

const emptyProduct: Product = {
  name: "",
  price: 0,
  image: "",
  category: customCategories[0].id,
  description: "",
  features: [],
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddForm = () => {
    setForm(emptyProduct);
    setEditId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm(product);
    setEditId(product._id || null);
    setShowForm(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await axios.post("http://localhost:5000/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({ ...f, image: res.data.url }));
    } catch {
      // handle error
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/products", form);
      }
      setShowForm(false);
      fetchProducts();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setConfirmDeleteId(null);
      fetchProducts();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Admin - Products</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button onClick={openAddForm} className="flex-1 sm:flex-initial">Add Product</Button>
            <Button variant="outline" onClick={handleLogout} className="flex-1 sm:flex-initial">Logout</Button>
          </div>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Name</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Price</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium hidden md:table-cell">Category</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium hidden lg:table-cell">Features</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {customCategories.find((cat) => cat.id === p.category)?.name || p.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">₹{p.price.toLocaleString()}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {customCategories.find((cat) => cat.id === p.category)?.name || p.category}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="line-clamp-2">
                        {Array.isArray(p.features) ? p.features.join(', ') : ''}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditForm(p)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setConfirmDeleteId(p._id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {/* Product Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-2">
              {/* Image upload section */}
              <div className="mb-2">
                <label className="block mb-1">Product Image</label>
                <div className="flex items-center gap-3">
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    variant="outline"
                  >
                    {uploadingImage
                      ? "Uploading..."
                      : form.image
                        ? "Change Image"
                        : "Upload Image"}
                  </Button>
                </div>
              </div>
              <Input
                required
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="mb-2"
              />
              <Input
                required
                type="number"
                placeholder="Price"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="mb-2"
              />
              {/* CATEGORY DROPDOWN */}
              <div className="mb-2">
                <label htmlFor="category" className="block mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  {customCategories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Features (one per line)</label>
                <textarea
                  value={(form.features || []).join('\n')}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      features: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="e.g.\nPremium Marble\nHandcrafted Finish\nCustom Sizes"
                  className="w-full border rounded px-3 py-1"
                  rows={4}
                />
              </div>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Description"
                className="w-full border rounded px-3 py-1 mb-2"
              />
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || uploadingImage}>
                  {editId ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!confirmDeleteId}
          onOpenChange={() => setConfirmDeleteId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div>Are you sure you want to delete this product?</div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={loading}
                onClick={() => handleDelete(confirmDeleteId!)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminProducts;
