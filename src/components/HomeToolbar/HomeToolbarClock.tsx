/*
 * ABOUTME: Clock component for the toolbar
 * ABOUTME: Displays current date and time, updates every second
 */

import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { format } from "date-fns";

import { ONE_SEC_IN_MS } from "@/utils/const";

import { Typography } from "@/components/Typography";

const HomeToolbarClock = () => {
  const [time, setTime] = useState(new Date());

  useInterval(() => {
    setTime(new Date());
  }, ONE_SEC_IN_MS);

  return (
    <time suppressHydrationWarning>
      <Typography variant="body2" uppercase>
        {format(time, "EEE d MMM HH:mm")}
      </Typography>
    </time>
  );
};

export default HomeToolbarClock;
