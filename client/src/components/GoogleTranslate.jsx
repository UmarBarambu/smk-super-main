import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Load Google Translate script only once
    const addScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    // Initialize with only English & Malay
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ms", // 🔹 only English & Malay
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    addScript();
  }, []);

  return (
    <div
      id="google_translate_element"
      className="text-black text-sm"
    ></div>
  );
};

export default GoogleTranslate;
