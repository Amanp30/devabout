import React from "react";
import styles from "../../styles/secondmenu.module.css";

function profile({ thefun, title, loadnow }) {
  return (
    <>
      <div className={styles.secpatti}>
        <div className={styles.divide}>
          <h1 className={styles.headingmenu}>{title}</h1>
          {loadnow ? (
            <div className={styles.savebtn}>
              <input
                type="submit"
                value=" Saving"
                className={styles.compsvbtn + " " + styles.disabled}
                disabled
              />
            </div>
          ) : (
            <div className={styles.savebtn}>
              <input
                type="submit"
                value="Save changes"
                className={styles.compsvbtn}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default profile;
