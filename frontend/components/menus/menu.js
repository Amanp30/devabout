import React, { useState, useEffect } from "react";
import Link from "next/link";
import { refreshauth, signout } from "../../actions/auth";
import styles from "../../styles/menu.module.css";

function menu() {
  const [click, setclick] = useState(false);

  useEffect(() => {
    refreshauth();
  }, []);

  return (
    <div className={styles.themenu}>
      <div className={styles.logos}>
        <img src="/static/projectstory.png" className={styles.logomain} />
      </div>
      <div className={styles.hambg} onClick={(e) => setclick(!click)}>
        {click ? "x" : "="}
      </div>
      <div
        className={
          click ? `${styles.links + " " + styles.mlinks}` : styles.links
        }
      >
        <Link href="/profile" onClick={(e) => setclick(!click)}>
          Profile
        </Link>
        <Link href="/links" onClick={(e) => setclick(!click)}>
          Links
        </Link>
        <Link href="/projects" onClick={(e) => setclick(!click)}>
          Projects
        </Link>
        <Link href="/settings" onClick={(e) => setclick(!click)}>
          Settings
        </Link>
        <Link href="" onClick={(e) => signout()}>
          Signout
        </Link>
      </div>
    </div>
  );
}

export default menu;
