import { type GroundYourselfIds } from "@root/src/utils/constants/ground-yourself-data";
import { EyeIcon } from "@components/react/icons/eye";
import { TouchIcon } from "@components/react/icons/touch";
import { EarIcon } from "@components/react/icons/ear";
import { NoseIcon } from "@components/react/icons/nose";
import { TongueIcon } from "@components/react/icons/tongue";

export const GroundYourselfDataIconSelector = (props: {
  id: GroundYourselfIds;
}) => {
  const { id } = props;

  switch (id) {
    case "see":
      return <EyeIcon keepFillColor />;
    case "feel":
      return <TouchIcon keepFillColor />;
    case "hear":
      return <EarIcon keepFillColor />;
    case "smell":
      return <NoseIcon keepFillColor />;
    case "taste":
      return <TongueIcon keepFillColor />;
    default:
      return null;
  }
};
