import React, { useRef } from "react";
import rawStyles from "../../assets/css/app.module.css?raw"; // Importa los estilos del módulo como texto
import styles from "../../assets/css/app.module.css"; // Importa los estilos del módulo como texto
import bootstrapStylesText from "bootstrap/dist/css/bootstrap.min.css?raw";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PrintButton: React.FC = () => {
  // Define el ref con el tipo HTMLIFrameElement o null
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handlePrint = () => {
    if (!iframeRef.current) return;

    // Crear un contenedor temporal
    const tempContainer = document.getElementById("layout-horario-un");

    // Obtener el HTML del componente
    const htmlContent = tempContainer!.innerHTML;

    let stylesText = rawStyles;
		Object.entries(styles).forEach(([original, unique]) => {
			const regex = new RegExp(`\\.${original}(?![\\w-])`, "g");
			stylesText = stylesText.replace(regex, `.${unique}`);
		});

    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${stylesText}</style>
						<style>${bootstrapStylesText}</style>
          </head>
          <body>${htmlContent}</body>
        </html>
      `);
      iframeDoc.close();

      // Iniciar la impresión
      iframeRef.current.contentWindow?.print();

      // Limpiar el contenido después de imprimir
      iframeDoc.body.innerHTML = "";
    }

  };

  return (
    <>
      <Button
        className="mx-2"
        color="primary"
        size="sm"
        onClick={handlePrint}
      >
        <FontAwesomeIcon icon={faPrint} />
      </Button>
      <iframe
        ref={iframeRef} // Asocia el ref al iframe
        style={{
          width: "0px",
          height: "0px",
          border: "none",
          position: "absolute",
          visibility: "hidden",
        }}
      />
    </>
  );
};

export default PrintButton;
