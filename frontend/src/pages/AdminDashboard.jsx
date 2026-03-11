import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Package, CalendarDays, ShoppingCart, Plus, Trash2, Edit, X, Check } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MenuItemRow = Tables<"menu_items">;
type OrderRow = Tables<"orders">;
type ReservationRow = Tables<"reservations">;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"menu" | "orders" | "reservations">("menu");
  const [menuItems, setMenuItems] = useState<MenuItemRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [reservations, setReservations] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemRow | null>(null);

  // Form state
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Signature", image_url: "", is_available: true });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      toast.error("Access denied");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [menuRes, orderRes, resRes] = await Promise.all([
      supabase.from("menu_items").select("*").order("id"),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("reservations").select("*").order("created_at", { ascending: false }),
    ]);
    if (menuRes.data) setMenuItems(menuRes.data);
    if (orderRes.data) setOrders(orderRes.data);
    if (resRes.data) setReservations(resRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", category: "Signature", image_url: "", is_available: true });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveItem = async () => {
    if (!form.name || !form.price) { toast.error("Name and price required"); return; }
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url.trim() || null,
      is_available: form.is_available,
    };

    if (editingItem) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editingItem.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Menu item updated!");
    } else {
      const { error } = await supabase.from("menu_items").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Menu item added!");
    }
    resetForm();
    fetchData();
  };

  const handleDeleteItem = async (id: number) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Item deleted");
    fetchData();
  };

  const startEdit = (item: MenuItemRow) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url || "",
      is_available: item.is_available,
    });
    setShowAddForm(true);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    toast.success(`Order marked as ${status}`);
    fetchData();
  };

  const updateReservationStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    toast.success(`Reservation ${status}`);
    fetchData();
  };

  const tabs = [
    { key: "menu" as const, label: "Menu Items", icon: Package, count: menuItems.length },
    { key: "orders" as const, label: "Orders", icon: ShoppingCart, count: orders.length },
    { key: "reservations" as const, label: "Reservations", icon: CalendarDays, count: reservations.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">THE REDBONE</h1>
          <p className="font-body text-sm text-muted-foreground">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            View Site
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-body text-sm hover:bg-destructive/20 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-body text-sm whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-ember text-primary-foreground shadow-ember"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.key ? "bg-primary-foreground/20" : "bg-muted"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-body">Loading...</div>
        ) : (
          <>
            {/* MENU TAB */}
            {activeTab === "menu" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-xl font-bold text-foreground">Menu Items</h2>
                  <button
                    onClick={() => { resetForm(); setShowAddForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-ember text-primary-foreground rounded-lg font-body text-sm shadow-ember"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display text-lg text-foreground">{editingItem ? "Edit Item" : "New Item"}</h3>
                      <button onClick={resetForm}><X className="w-5 h-5 text-muted-foreground" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item name *" className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70" />
                      <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price *" type="number" step="0.01" className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70" />
                      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70" />
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary/70">
                        <option value="Signature">Signature</option>
                        <option value="Sandwiches">Sandwiches</option>
                        <option value="Premium">Premium</option>
                        <option value="Sides">Sides</option>
                      </select>
                      <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70" />
                      <label className="flex items-center gap-2 font-body text-sm text-foreground">
                        <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} className="accent-primary" />
                        Available
                      </label>
                    </div>
                    <button onClick={handleSaveItem} className="px-6 py-2 bg-gradient-ember text-primary-foreground rounded-lg font-body text-sm shadow-ember">
                      {editingItem ? "Update Item" : "Add Item"}
                    </button>
                  </div>
                )}

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-4 py-3 font-body text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                        <th className="px-4 py-3 font-body text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                        <th className="px-4 py-3 font-body text-xs uppercase tracking-wider text-muted-foreground">Price</th>
                        <th className="px-4 py-3 font-body text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                        <th className="px-4 py-3 font-body text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-body text-sm text-foreground">{item.name}</td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground">{item.category}</td>
                          <td className="px-4 py-3 font-body text-sm text-primary font-bold">${Number(item.price).toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-body ${item.is_available ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
                              {item.is_available ? "Available" : "Unavailable"}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground font-body">No orders yet</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <p className="font-display text-lg text-foreground">{order.customer_name}</p>
                          <p className="font-body text-sm text-muted-foreground">{order.customer_email} · {order.customer_phone || "No phone"}</p>
                          <p className="font-body text-xs text-muted-foreground mt-1">{new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-xl font-bold text-primary">${Number(order.total).toFixed(2)}</p>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-body ${
                            order.status === "pending" ? "bg-secondary/20 text-secondary" :
                            order.status === "confirmed" ? "bg-primary/20 text-primary" :
                            order.status === "completed" ? "bg-primary/30 text-primary" :
                            "bg-destructive/20 text-destructive"
                          }`}>{order.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {order.status === "pending" && (
                          <>
                            <button onClick={() => updateOrderStatus(order.id, "confirmed")} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded font-body text-xs hover:bg-primary/20">
                              <Check className="w-3 h-3" /> Confirm
                            </button>
                            <button onClick={() => updateOrderStatus(order.id, "cancelled")} className="flex items-center gap-1 px-3 py-1.5 bg-destructive/10 text-destructive rounded font-body text-xs hover:bg-destructive/20">
                              <X className="w-3 h-3" /> Cancel
                            </button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <button onClick={() => updateOrderStatus(order.id, "completed")} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded font-body text-xs hover:bg-primary/20">
                            <Check className="w-3 h-3" /> Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* RESERVATIONS TAB */}
            {activeTab === "reservations" && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Reservations</h2>
                {reservations.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground font-body">No reservations yet</p>
                ) : (
                  reservations.map((res) => (
                    <div key={res.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <p className="font-display text-lg text-foreground">{res.name}</p>
                          <p className="font-body text-sm text-muted-foreground">{res.email} · {res.phone || "No phone"}</p>
                          <p className="font-body text-sm text-foreground mt-2">
                            📅 {res.date} at {res.time} · 👥 Party of {res.party_size}
                          </p>
                          {res.notes && <p className="font-body text-xs text-muted-foreground mt-1">Notes: {res.notes}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-body ${
                          res.status === "pending" ? "bg-secondary/20 text-secondary" :
                          res.status === "confirmed" ? "bg-primary/20 text-primary" :
                          "bg-destructive/20 text-destructive"
                        }`}>{res.status}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {res.status === "pending" && (
                          <>
                            <button onClick={() => updateReservationStatus(res.id, "confirmed")} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded font-body text-xs hover:bg-primary/20">
                              <Check className="w-3 h-3" /> Confirm
                            </button>
                            <button onClick={() => updateReservationStatus(res.id, "cancelled")} className="flex items-center gap-1 px-3 py-1.5 bg-destructive/10 text-destructive rounded font-body text-xs hover:bg-destructive/20">
                              <X className="w-3 h-3" /> Decline
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
