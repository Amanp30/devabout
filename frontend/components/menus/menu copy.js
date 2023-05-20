import React, { useEffect } from "react";
import Link from "next/link";
import { refreshauth, signout } from "../../actions/auth";
import styles from "../../styles/menu.module.css";
import { useRouter } from "next/router";

function menu() {
  var router = useRouter();
  var Basepath = `http://localhost:3000${router.asPath}`;
  var width = "";
  if (typeof window !== "undefined") {
    var b = window.innerWidth;
    width = Number(b);
  }

  useEffect(() => {
    refreshauth();
  }, []);

  return (
    <div className={styles.boringmenu}>
      <div className={styles.logo}>
        <img className={styles.pslogo} src="/static/projectstory.png" />
      </div>
      <div className={styles.menu}>
        <div className={styles.mlinks}>
          <Link
            href="/profile"
            className={
              Basepath == "http://localhost:3000/profile" ||
              Basepath == "http://localhost:3000/profile/links"
                ? styles.dot
                : null
            }
          >
            Profile
          </Link>
          <Link
            href="/links"
            className={
              Basepath == "http://localhost:3000/profile" ||
              Basepath == "http://localhost:3000/profile/links"
                ? styles.dot
                : null
            }
          >
            Links
          </Link>
          <Link
            href="/projects"
            className={
              Basepath == "http://localhost:3000/projects" ? styles.dot : null
            }
          >
            Projects
          </Link>
          <Link
            href="/settings"
            className={
              Basepath == "http://localhost:3000/settings" ? styles.dot : null
            }
          >
            Setting
          </Link>
        </div>
        <div className={styles.mactions}>
          <Link href="" onClick={(e) => signout()}>
            Signout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default menu;
