"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import TripsWrite from "@/components/trips-write";

function TripEditPage() {
  return <TripsWrite isEdit={true} />;
}

export default withAuth(TripEditPage);
