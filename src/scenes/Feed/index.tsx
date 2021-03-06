import React from "react";
import Feed from "components/feed";
import Banner from "./components/banner";

export interface FeedSceneProps {
  loggedIn: boolean;
  firstName: string;
}

export const FeedScene: React.FC<FeedSceneProps> = ({
  loggedIn,
  firstName
}) => {
  return (
    <React.Fragment>
      <Banner loggedIn={loggedIn} firstName={firstName} />
      <Feed tags={[]} companies={[]} search={""} />
    </React.Fragment>
  );
};
