import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import loginBg from "@/assets/login-bg.jpg";

export default function ProLoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

  const handleSubmit = useCallback(() => {
    const newErrors: { email?: boolean; password?: boolean } = {};
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate("/pro/dashboard");
    }
  }, [email, password, navigate]);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0">
        <img src={loginBg} alt="" className="w-full h-full object-cover saturate-[0.35] contrast-[0.85] brightness-[0.45]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,40,34,0.55), rgba(30,40,34,0.7))" }} />
      </div>
      <div
        className="relative z-10 w-full bg-card"
        style={{
          maxWidth: 420,
          borderRadius: 16,
          padding: 48,
          boxShadow: "0 4px 24px rgba(44,74,62,0.10)",
        }}
      >
        {/* Brand */}
        <h1 className="font-sans font-bold text-primary text-center text-[18px] mb-1">
          Mallorca Holística
        </h1>
        <p className="text-muted-foreground text-[13px] text-center mb-8">
          {t("proLogin.subtitle")}
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-foreground text-sm font-medium mb-1.5">
            {t("proLogin.email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })); }}
            className="w-full text-foreground bg-background focus:outline-none transition-all"
            style={{
              height: 56,
              borderRadius: 10,
              border: errors.email ? "1.5px solid hsl(0, 84%, 60%)" : "1.5px solid rgba(44,74,62,0.25)",
              fontSize: 16,
              padding: "0 16px",
            }}
            onFocus={(e) => { if (!errors.email) e.currentTarget.style.border = "1.5px solid hsl(var(--accent))"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(44,74,62,0.15)"; }}
            onBlur={(e) => { e.currentTarget.style.border = errors.email ? "1.5px solid hsl(0, 84%, 60%)" : "1.5px solid rgba(44,74,62,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{t("proLogin.errorEmail")}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-1">
          <label className="block text-foreground text-sm font-medium mb-1.5">
            {t("proLogin.password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: false })); }}
            className="w-full text-foreground bg-background focus:outline-none transition-all"
            style={{
              height: 56,
              borderRadius: 10,
              border: errors.password ? "1.5px solid hsl(0, 84%, 60%)" : "1.5px solid rgba(44,74,62,0.25)",
              fontSize: 16,
              padding: "0 16px",
            }}
            onFocus={(e) => { if (!errors.password) e.currentTarget.style.border = "1.5px solid hsl(var(--accent))"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(44,74,62,0.15)"; }}
            onBlur={(e) => { e.currentTarget.style.border = errors.password ? "1.5px solid hsl(0, 84%, 60%)" : "1.5px solid rgba(44,74,62,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{t("proLogin.errorPassword")}</p>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-right mb-6">
          <button className="text-accent text-[13px] hover:underline cursor-pointer bg-transparent border-0 p-0">
            {t("proLogin.forgot")}
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ height: 56, borderRadius: 10, fontSize: 15 }}
        >
          {t("proLogin.submit")}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-[13px]">{t("proLogin.noAccount")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Secondary CTA */}
        <Link
          to="/pro/register"
          className="w-full flex items-center justify-center border border-primary text-primary font-semibold transition-all hover:bg-primary/5 active:scale-[0.98]"
          style={{ height: 56, borderRadius: 10, fontSize: 15 }}
        >
          {t("proLogin.createProfile")}
        </Link>

        {/* Footer */}
        <p className="text-muted-foreground text-[12px] text-center mt-6">
          {t("proLogin.footer")}
        </p>
      </div>
    </div>
  );
}
