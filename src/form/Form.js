import React, { useState } from "react";
import "./Form.css";
import { motion } from "framer-motion";
// popup formu
function Form({ info, setInfo, onAdd }) {
  const { link, name, explaination } = info;
  const [modal, setModal] = useState(false);

  const [empty, setEmpty] = useState(true);
  const [success, setSuccess] = useState(false);

  // popup
  function popUp() {
    setModal(true);
  }

  // popup ters
  function popIn() {
    if ((link, name, explaination)) {
      setSuccess(true);
      setTimeout(() => {
        setModal(false);
        setSuccess(false);
      }, 2000);
    } else {
      setEmpty(false);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setEmpty(true);
  };

  // iptal buttonun fonksiyon
  function cancel() {
    setModal(false);
    setEmpty(true);
    setInfo({
      link: "",
      name: "",
      explaination: "",
    });
  }
  return (
    <div className="form-container">
      <motion.button
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
        className="addBtn"
        onClick={popUp}
      >
        <i className="fa-solid fa-plus"></i> Yeni Hesap Ekle
      </motion.button>
      <span
        onClick={() => setModal(false)}
        className={modal ? "overlay open" : "overlay"}
      ></span>
      {/* {modal ? "overlay open" : "overlay"} */}
      <div className="form-subContainer">
        <div className={modal ? "modal open" : "modal"}>
          <span className="closebtn" onClick={() => setModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
          <p style={{ paddingTop: "50px", fontSize: "20px", color: "#744bfc" }}>
            {success && "başarıyla eklendi"}
          </p>
          <form className="form" onSubmit={onAdd}>
            <div className="form-item">
              <label>Social Media Linki</label>
              <input
                type="text"
                className="input"
                name="link"
                value={link}
                onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                {empty ? "" : "social media linki girin"}
              </p>
            </div>

            <div className="form-item">
              <label>Social Media Adı</label>
              <input
                type="text"
                className="input"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                {empty ? "" : "social media adınız girin"}
              </p>
            </div>

            <div className="form-item">
              <label>Açıklama</label>
              <input
                type="text"
                className="input"
                name="explaination"
                value={explaination}
                onChange={handleChange}
              />
              <p style={{ color: "red" }}>{empty ? "" : "açıklama girin"}</p>
            </div>

            <div className="form-itemBtn">
              <input
                onClick={cancel}
                className="cancel"
                type="submit"
                value="Vazgeç"
              />
              <input
                // disabled={disabled}
                onClick={popIn}
                className="submit"
                type="submit"
                value="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Form;
