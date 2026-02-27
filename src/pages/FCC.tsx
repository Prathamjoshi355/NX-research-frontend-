/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero  from "../components/FCCHero";
import  NetworkVisual  from "../components/FCCNetworkVisual";
import { PreviousSessions } from "../components/FCCPreviousSessions";
import { WhoCanAttend } from "../components/FCCWhoCanAttend";
import { Benefits } from "../components/FCCBenefits";
import { PostEventConnect } from "../components/FCCPostEventConnect";
import SEO from "../components/SEO";

export default function FCCPage() {
  return (
     <main className="initiatives-page">
      <SEO 
        title="Founder Circle Community" 
        description="Join the Founder Circle Community (FCC) to network with elite founders, share insights, and build the next generation of ventures."
      />
      <div className="page-grid" />
      <Hero />
      <NetworkVisual />
      <PreviousSessions />
      <WhoCanAttend />
      <Benefits />
      <PostEventConnect />
    </main >
  );
}
