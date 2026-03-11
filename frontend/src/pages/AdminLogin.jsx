import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Flame, Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! Please check your email to verify, then log in.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check if user has admin role
        const { data: roles, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin");

        if (roleError) throw roleError;

        if (!roles || roles.length === 0) {
          await supabase.auth.signOut();
          toast.error("Access denied. You are not an admin.");
          return;
        }

        toast.success("Welcome back, Admin!");
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Flame className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Portal</h1>
          <p className="font-body text-muted-foreground mt-2">THE REDBONE Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-body font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="admin@redbone.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-body font-medium text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-ember text-primary-foreground font-body font-semibold rounded-xl shadow-ember hover:shadow-ember-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground font-body">
            {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary font-body transition-colors">
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
