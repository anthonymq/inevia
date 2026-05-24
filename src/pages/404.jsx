import React from "react";
import SEO from "components/SEO";

const NotFoundPage = () => (
  <>
    <SEO
      title="Page non trouvee"
      description="La page demandee est introuvable."
      pathname="/404"
      robots="noindex, nofollow"
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
);

export default NotFoundPage;
