import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/app/services/utils/i18n.config";
import { useState } from "react";

const supportedLanguageIcons = {
  en: "/assets/imgs/theme/flag-us.png",
  vn: "/assets/imgs/theme/flag-vn.png",
};

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false); // State to control dropdown menu visibility

  // Function to handle language change
  const changeLanguage = (lang = "en") => {
    i18n.changeLanguage(lang);
    setOpen(false); // Close dropdown after language change
  };
  return (
    <>
      {/* <select
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.entries(supportedLanguages).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select> */}
      <li className="dropdown nav-item">
        <a
          className="dropdown-toggle"
          onClick={() => setOpen(!open)} // Toggle dropdown menu visibility
          href="#"
          id="dropdownLanguage"
          aria-expanded={open ? "true" : "false"} // Set aria-expanded based on dropdown visibility
        >
          <i className="material-icons md-public"></i>
        </a>
        <div
          className={`dropdown-menu dropdown-menu-end ${open ? "show" : ""}`} // Add "show" class when dropdown is open
          aria-labelledby="dropdownLanguage"
        >
          {Object.entries(supportedLanguages).map(([key, value]) => (
            <a
              key={key}
              className={`dropdown-item ${
                i18n.resolvedLanguage === key ? "text-brand" : ""
              }`} // Add "active" class to active language
              href="#"
              onClick={() => changeLanguage(key)} // Call changeLanguage function on click
            >
              <img
                src={
                  supportedLanguageIcons[
                    key as keyof typeof supportedLanguageIcons
                  ]
                } // Add index signature to allow indexing with a string
                alt={value}
              />
              {value}
            </a>
          ))}
        </div>
      </li>
    </>
  );
}
