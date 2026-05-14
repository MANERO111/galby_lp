"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions";

interface FormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
}

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2)
      newErrors.fullName = "Nom invalide / اسم غير صالح";
    if (!/^\+?[\d\s\-().]{7,}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Téléphone invalide / رقم غير صالح";
    if (!formData.address.trim() || formData.address.trim().length < 5)
      newErrors.address = "Adresse invalide / عنوان غير صالح";
    if (!formData.city.trim() || formData.city.trim().length < 2)
      newErrors.city = "Ville invalide / مدينة غير صالحة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields: {
    name: keyof FormData;
    label: { fr: string; ar: string };
    placeholder: { fr: string; ar: string };
    type: string;
    icon: React.ReactNode;
  }[] = [
    {
      name: "fullName",
      label: { fr: "Nom Complet", ar: "الاسم الكامل" },
      placeholder: { fr: "Jean Dupont", ar: "فلان الفلاني" },
      type: "text",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "phoneNumber",
      label: { fr: "Numéro de Téléphone", ar: "رقم الهاتف" },
      placeholder: { fr: "+212 600-000000", ar: "+212 600-000000" },
      type: "tel",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      name: "address",
      label: { fr: "Adresse", ar: "العنوان" },
      placeholder: { fr: "123 Rue de la Liberté", ar: "123 شارع الحرية" },
      type: "text",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      name: "city",
      label: { fr: "Ville", ar: "المدينة" },
      placeholder: { fr: "Casablanca", ar: "الدار البيضاء" },
      type: "text",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white flex items-center justify-center px-4 py-16">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkPop {
          0% { transform: scale(0) rotate(-12deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .scale-in { animation: scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .check-pop { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .shimmer-btn {
          background: linear-gradient(90deg, #111 40%, #555 50%, #111 60%);
          background-size: 200% auto;
          animation: shimmer 1.4s linear infinite;
        }
        .spin-loader { animation: spin-slow 0.8s linear infinite; }
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.13s; }
        .stagger-3 { animation-delay: 0.21s; }
        .stagger-4 { animation-delay: 0.29s; }
        .stagger-5 { animation-delay: 0.37s; }
        .field-focus-ring:focus-within .field-label {
          color: #111;
        }
      `}</style>

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 fade-up text-center lg:text-left">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase mb-3">
            Coordonnées / معلومات الاتصال
          </span>
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
            Parlez-nous de <span className="text-neutral-400 text-3xl block lg:inline">vous / أخبرنا عن نفسك</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Remplissez vos informations ci-dessous et nous vous contacterons sous peu.<br />
            املأ معلوماتك أدناه وسنتصل بك في أقرب وقت ممكن.
          </p>
        </div>

        {/* Card */}
        <div className="fade-up stagger-1 bg-white border border-neutral-100 rounded-3xl shadow-[0_8px_48px_-8px_rgba(0,0,0,0.10)] overflow-hidden">
          {submitted ? (
            /* Success State */
            <div className="scale-in flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="check-pop w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">C'est prêt ! / تم بنجاح!</h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                Nous avons reçu vos coordonnées. Nous vous contacterons bientôt.<br />
                لقد تلقينا بياناتك. سنتصل بك قريباً.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ fullName: "", phoneNumber: "", address: "", city: "" }); }}
                className="mt-8 text-xs font-semibold text-neutral-400 hover:text-neutral-900 transition-colors duration-200 underline underline-offset-4"
              >
                Envoyer un autre / إرسال نموذج آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-8 space-y-5">
              {fields.map((field, i) => {
                const isFocused = focusedField === field.name;
                const hasError = !!errors[field.name];
                const hasValue = !!formData[field.name];

                return (
                  <div
                    key={field.name}
                    className={`fade-up stagger-${i + 2}`}
                  >
                    <div
                      className={`field-focus-ring relative rounded-2xl border transition-all duration-200 ${
                        hasError
                          ? "border-red-300 bg-red-50/40"
                          : isFocused
                          ? "border-neutral-900 bg-white shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
                          : hasValue
                          ? "border-neutral-300 bg-white"
                          : "border-neutral-200 bg-neutral-50/60"
                      }`}
                    >
                      {/* Floating label */}
                      <div
                        className={`field-label absolute left-11 right-11 transition-all duration-200 pointer-events-none font-medium flex justify-between items-center ${
                          isFocused || hasValue
                            ? "top-2.5 text-[10px] tracking-wide"
                            : "top-1/2 -translate-y-1/2 text-sm"
                        } ${
                          hasError
                            ? "text-red-400"
                            : isFocused
                            ? "text-neutral-900"
                            : "text-neutral-400"
                        }`}
                      >
                        <span>{field.label.fr}</span>
                        <span dir="rtl">{field.label.ar}</span>
                      </div>

                      {/* Icon */}
                      <span
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                          hasError ? "text-red-400" : isFocused ? "text-neutral-900" : "text-neutral-300"
                        }`}
                      >
                        {field.icon}
                      </span>

                      {/* Input */}
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        autoComplete="off"
                        placeholder={isFocused ? `${field.placeholder.fr} / ${field.placeholder.ar}` : ""}
                        className={`w-full bg-transparent outline-none text-sm font-medium text-neutral-900 placeholder:text-neutral-300 transition-all duration-200 ${
                          isFocused || hasValue ? "pt-7 pb-2.5 px-11" : "py-4 px-11"
                        }`}
                      />

                      {/* Checkmark */}
                      {hasValue && !hasError && !isFocused && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 scale-in">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>

                    {/* Error message */}
                    {hasError && (
                      <p className="fade-up mt-1.5 ml-1 text-xs text-red-400 font-medium">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Submit Error */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-500 font-medium fade-up">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <div className={`fade-up stagger-5 pt-2`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide text-white transition-all duration-200 active:scale-[0.98] ${
                    isSubmitting
                      ? "shimmer-btn cursor-not-allowed"
                      : "bg-neutral-900 hover:bg-neutral-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.40)]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2.5">
                      <svg className="spin-loader w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Envoi en cours... / جاري الإرسال...
                    </span>
                  ) : (
                    <span className="flex justify-between px-4">
                      <span>Envoyer les informations →</span>
                      <span dir="rtl">إرسال المعلومات ←</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer note */}
        {!submitted && (
          <p className="fade-up stagger-5 mt-5 text-center text-xs text-neutral-300">
            Vos données sont en sécurité avec nous. / بياناتك في أمان معنا.
          </p>
        )}
      </div>
    </section>
  );
}
