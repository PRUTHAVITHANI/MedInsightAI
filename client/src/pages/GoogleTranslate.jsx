import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.type = 'text/javascript';
    googleTranslateScript.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    googleTranslateScript.async = true;
    document.body.appendChild(googleTranslateScript);

    const googleTranslateInitScript = document.createElement('script');
    googleTranslateInitScript.type = 'text/javascript';
    googleTranslateInitScript.innerHTML = `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      }
    `;
    document.body.appendChild(googleTranslateInitScript);

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      .goog-logo-link {
        display: inline !important;
     
        white-space: nowrap; /* Ensure text stays on one line */
        font-size: 12px; /* Adjust font size as needed */
      }

      .goog-te-gadget img {
        vertical-align: middle;
        border: none;
        display: none;
    }

      .goog-te-gadget .goog-te-combo {
        border: 1px solid;
        border-radius: 4px;
        padding: 2px;
    
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 16px;
      }
   
      .goog-te-gadget div:first-child {
         flex-direction: column;
        align-items: center;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(googleTranslateScript);
      document.body.removeChild(googleTranslateInitScript);
      document.head.removeChild(style);
    };
  }, []);

  return <div  id="google_translate_element"></div>;
};

export default GoogleTranslate;
