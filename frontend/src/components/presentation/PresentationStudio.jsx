import React, {useState} from "react";
import PresentationMode from "./PresentationMode";
import {generatePresentation} from "../../services/presentation.service";
import styles from "./presentation.module.css";

export default function PresentationStudio({onClose}) {
  const [title, setTitle] = useState("");
  const [presenter, setPresenter] = useState("");
  const [description, setDescription] = useState("");
  const [slides, setSlides] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSlides = async () => {
    try {
      setLoading(true);

      const aiSlides = await generatePresentation({
        title,
        presenter,
        description,
      });

      setSlides(aiSlides);
    } catch (err) {
      console.error(err);
      alert("Failed to generate presentation.");
    } finally {
      setLoading(false);
    }
  };

  if (slides) {
    return <PresentationMode slides={slides} onClose={onClose} />;
  }

  return (
    <div className={styles.presentationStudio}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎓 Presentation Studio</h1>

        <input
          className={styles.input}
          placeholder="Presentation Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Presenter Name"
          value={presenter}
          onChange={(e) => setPresenter(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Presentation Description"
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.generate}
            onClick={generateSlides}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Presentation"}
          </button>
        </div>
      </div>
    </div>
  );
}
