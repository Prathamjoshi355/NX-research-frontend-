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

export default function FCCPage() {
  return (
     <main className="initiatives-page">
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
