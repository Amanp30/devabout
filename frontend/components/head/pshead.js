import React from "react";
import Head from "next/head";
function pshead({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}

export default pshead;
